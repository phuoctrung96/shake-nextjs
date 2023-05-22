import type { NextApiRequest } from 'next';
import { io } from '../../lib/io';

const handler = async (req: NextApiRequest, res: any) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.status(405).send({ message: 'Only POST or GET requests allowed' });
    return;
  }

  if (req.method === 'GET') {
    io(res);

    return res.status(200).json({ message: 'ok' });
  }

  res.status(500).json({ message: 'Something went wrong.' });
};

export default handler;
