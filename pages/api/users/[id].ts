import type { NextApiRequest, NextApiResponse } from 'next';
import { readDb } from '../../../lib/readDb';
import type { User } from '../../../types';

let users: User[] = [];

async function loadUsers() {
  if (users.length === 0) {
    const data = await readDb();
    users = data.users;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await loadUsers();

  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const userIndex = users.findIndex(u => u.id === id);

  switch (req.method) {
    case 'GET':
      if (userIndex === -1) return res.status(404).json({ error: 'Usuário não encontrado' });
      return res.status(200).json(users[userIndex]);

    case 'PUT':
      if (userIndex === -1) return res.status(404).json({ error: 'Usuário não encontrado' });
      const updatedUser = req.body;
      users[userIndex] = updatedUser;
      return res.status(200).json(updatedUser);

    case 'DELETE':
      if (userIndex === -1) return res.status(404).json({ error: 'Usuário não encontrado' });
      const deletedUser = users.splice(userIndex, 1);
      return res.status(200).json(deletedUser[0]);

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
