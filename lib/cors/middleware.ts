import type { NextApiRequest, NextApiResponse } from 'next';

export function corsMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  allowedOrigins: string[] = []
): Promise<void> {
  return new Promise((resolve) => {
    const origin = req.headers.origin || '';
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return resolve();
    }
    resolve();
  });
}
