import redis from '../../../lib/redis';
import type { NextApiRequest } from 'next';
import { io } from '../../../lib/io';
import { REDIS_KEY_EXPIRY_TIME_SEVEN_DAYS } from '../../../api/redis';

const handler = async (req: NextApiRequest, res: any) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  if (req.method === 'POST') {
    const body = req.body;

    const ioClient = io(res);

    const slug = Array.isArray(req.query.slug) ? req.query.slug[0] : req.query.slug;
    const dataType = Array.isArray(req.query.dataType) ? req.query.dataType[0] : req.query.dataType;
    const redisKey = `${dataType}/${slug}`;

    ioClient.emit(redisKey, JSON.stringify({ ...body, slug }));

    await redis.hset(
      redisKey,
      'response',
      JSON.stringify(body),
      'updatedOn',
      new Date().toISOString()
    );
    await redis.expire(redisKey, REDIS_KEY_EXPIRY_TIME_SEVEN_DAYS);

    return res.status(200).json({ message: 'ok' });
  }

  res.status(500).json({ message: 'Something went wrong.' });
};

export default handler;
