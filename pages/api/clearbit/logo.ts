import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { newFetch } from '../../../utils/fetch';

export type ClearbitLogoType = {
  url: string;
};

const getClearbitImage = async (url: string): Promise<AxiosResponse> => {
  const result = await newFetch.get(`https://logo.clearbit.com/${url}`);

  return result.data;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = Array.isArray(req.query.url) ? req.query.url[0] : req.query.url;

  try {
    const clearbitResponse = await getClearbitImage(url || '');

    res.status(200).json(clearbitResponse);
  } catch (error: any) {
    error.response?.status === 404
      ? res.status(200).json({ notFound: true })
      : res.status(error.response.status).json({ error });
  }
};

export default handler;
