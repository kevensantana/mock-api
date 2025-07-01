import path from 'path';
import { promises as fs } from 'fs';

export async function readDb() {
  const jsonPath = path.join(process.cwd(), 'data', 'db.json');
  const jsonData = await fs.readFile(jsonPath, 'utf-8');
  return JSON.parse(jsonData);
}
