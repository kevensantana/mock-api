import type { NextApiRequest, NextApiResponse } from 'next';
import { readDb } from '../../lib/readDb';

import type { User } from '../../types';

let users: User[] = [];

async function loadUsers() {
  if (users.length === 0) {
    const data = await readDb();
    users = data.users;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await loadUsers();

  if (req.method === 'GET') {
    return res.status(200).json(users);
  }

  if (req.method === 'POST') {
    const newUser = req.body;
    users.push(newUser);
    return res.status(201).json(newUser);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
