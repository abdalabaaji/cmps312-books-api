import { promises as fs } from 'fs';
import path from 'path';

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  categoryId: number;
}

const dataDir = path.join(process.cwd(), 'data');

export async function getCategories(): Promise<Category[]> {
  const filePath = path.join(dataDir, 'categories.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

export async function saveCategories(categories: Category[]): Promise<void> {
  const filePath = path.join(dataDir, 'categories.json');
  await fs.writeFile(filePath, JSON.stringify(categories, null, 2), 'utf-8');
}

export async function getBooks(): Promise<Book[]> {
  const filePath = path.join(dataDir, 'books.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

export async function saveBooks(books: Book[]): Promise<void> {
  const filePath = path.join(dataDir, 'books.json');
  await fs.writeFile(filePath, JSON.stringify(books, null, 2), 'utf-8');
}
