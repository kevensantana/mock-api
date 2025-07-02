import type { NextApiRequest, NextApiResponse } from 'next';
import { corsMiddleware } from '../../lib/cors/middleware';
import { readDb } from '../../lib/readDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await corsMiddleware(req, res, ['https://participeai.vercel.app']);

  try {
    const data = await readDb();

    if (req.method === 'GET') {
      return res.status(200).json(data.companies);
    }

    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch {
    res.status(500).json({ error: 'Erro ao ler dados' });
  }
}
