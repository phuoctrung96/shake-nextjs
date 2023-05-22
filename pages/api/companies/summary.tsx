import redis from '../../../lib/redis';
import { NextApiRequest, NextApiResponse } from 'next';
import { REDIS_KEY_EXPIRY_TIME_SEVEN_DAYS } from '../../../api/redis';
import { SummaryResType } from '../../../types/companies';
import { newApiFetch } from '../../../utils/fetch';

const getSummary = async (slug: string): Promise<SummaryResType> => {
  const result = await newApiFetch.get('internal/companies/summary', {
    params: { tag: slug },
  });

  return result.data;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = Array.isArray(req.query.slug) ? req.query.slug[0] : req.query.slug ?? '';
  const redisKey = `summary/${slug}`;

  if (slug === 'trustpilot') {
    return res.status(404).end();
  }

  try {
    const summaryRedisRes: string | null = await redis.hget(redisKey, 'response');

    if (!summaryRedisRes) {
      console.log(`summary for ${slug} doesn't exist in Redis`);
      const summaryRes = await getSummary(slug);
      console.log(summaryRes);

      const filteredProfileSummary = summaryRes.profile_summary.per_source.filter(
        (item) => item.source !== 'trustpilot'
      );
      const filteredReviewSummary = summaryRes.review_summary.per_source.filter(
        (item) => item.review_site !== 'trustpilot'
      );
      const filteredSampleProfiles = summaryRes.sample_profiles.map((sampleProfile) => {
        return {
          ...sampleProfile,
          profiles: sampleProfile.profiles.filter((profile) => profile.source !== 'trustpilot'),
        };
      });
      const filteredSampleReviews = summaryRes.sample_reviews.filter(
        (sampleReview) => sampleReview.source !== 'trustpilot'
      );

      const filteredSummaryRes = {
        ...summaryRes,
        profile_summary: {
          ...summaryRes.profile_summary,
          per_source: filteredProfileSummary,
        },
        // profile_summary: { per_source: { ...filteredProfileSummary } },
        review_summary: { ...summaryRes.review_summary, per_source: filteredReviewSummary },
        sample_profiles: [...filteredSampleProfiles],
        sample_reviews: filteredSampleReviews,
      };
      console.log(filteredSummaryRes);
      await redis.hset(
        redisKey,
        'response',
        JSON.stringify(filteredSummaryRes),
        'updatedOn',
        new Date().toISOString()
      );
      await redis.expire(redisKey, REDIS_KEY_EXPIRY_TIME_SEVEN_DAYS);

      res.status(200).json({ ...filteredSummaryRes, slug });
      return;
    }

    console.log(`summary for ${slug} exists in Redis`);
    const summaryJson: SummaryResType = await JSON.parse(summaryRedisRes);
    const updatedOnRedisRes: string | null = await redis.hget(redisKey, 'updatedOn');

    res.status(200).json({ ...summaryJson, slug, updatedOn: updatedOnRedisRes });
  } catch (error: any) {
    console.log(error);
    res
      .status(error?.response?.status ?? 500)
      .json({ error: error?.response?.data ?? 'Something went wrong' });
  }
};

export default handler;
