import redis from '../../../lib/redis';
import { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CompetitorsResType } from '../../../types/companies';
import { newApiFetch } from '../../../utils/fetch';

export type RequestResType = {
  success: boolean;
  message: 'Your task was successfully submitted.' | string;
  request_id?: string;
};

type DataType = 'competitors' | 'reviews' | 'wordCloud';

const apiRoutes = {
  reviews: 'reviews',
  competitors: 'internal/competitors',
  wordCloud: 'internal/companies/word_cloud',
};

export const requestDataFromApi = async (
  slug: string,
  dataType: DataType
): Promise<RequestResType> => {
  const callback =
    process.env.NEXT_PUBLIC_ENV === 'development'
      ? `${process.env.CALLBACK_URL}api/companies/data-cb?slug=${encodeURIComponent(
          slug
        )}&dataType=${dataType}`
      : `${process.env.NEXT_PUBLIC_FETCH_URL}api/companies/data-cb?slug=${encodeURIComponent(
          slug
        )}&dataType=${dataType}`;

  const result: AxiosResponse<RequestResType> = await newApiFetch(apiRoutes[dataType], {
    params: {
      name: slug,
      callback,
      ...(dataType === 'reviews' && { timeseries: true }),
    },
  });

  return result.data;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = Array.isArray(req.query.slug) ? req.query.slug[0] : req.query.slug ?? '';
  const dataType: DataType = Array.isArray(req.query.dataType)
    ? (req.query.dataType[0] as DataType)
    : (req.query.dataType as DataType);
  const redisKey = `${dataType}/${slug}`;

  try {
    const redisRes: string | null = await redis.hget(redisKey, 'response');

    if (!redisRes) {
      console.log(`${dataType} for ${slug} doesn't exist in Redis`);

      await requestDataFromApi(slug, dataType);
      await redis.hset(
        redisKey,
        'response',
        JSON.stringify({
          loading: true,
          slug,
          requestDateTime: new Date().toISOString(),
        })
      );
      await redis.expire(redisKey, 60 * 60); // 1 hour

      res.status(200).json({ loading: true, slug });
      return;
    }

    const responseJson: CompetitorsResType = await JSON.parse(redisRes || '');

    if (responseJson.loading) {
      const timeNow = new Date().getTime();
      const timeThen = new Date(responseJson.requestDateTime).getTime();
      const fiveMinutes = 5 * 60 * 1000;

      if (timeNow - timeThen > fiveMinutes) {
        // request again, if time is more than 5 minutes
        console.log(`${dataType} for ${slug} requested from API again.`);

        await requestDataFromApi(slug, dataType);
        await redis.hset(
          redisKey,
          'response',
          JSON.stringify({
            loading: true,
            slug,
            requestDateTime: new Date().toISOString(),
          })
        );
        await redis.expire(redisKey, 60 * 60); // 1 hour

        res.status(200).json({ loading: true, slug });
        return;
      }

      console.log(`${dataType} for ${slug} requested from API`);

      res.status(200).json({ ...responseJson, slug, loading: true });
      return;
    }

    const updatedOnRedisRes: string | null = await redis.hget(redisKey, 'updatedOn');

    console.log(`${dataType} for ${slug} exists in Redis`);
    res
      .status(200)
      .json({ ...responseJson, slug, loading: false, updatedOn: updatedOnRedisRes || '' });
  } catch (error: any) {
    res.status(200).json({ success: false, message: 'No industry data', slug });
    console.log(error);
  }
};

export default handler;
