import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
});

// Helper function to execute SQL queries
async function query<T>(text: string, params?: any[]): Promise<{ rows: T[] }> {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return { rows: result.rows };
  } finally {
    client.release();
  }
}

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

export async function getCategories(): Promise<Category[]> {
  const { rows } = await query<Category>('SELECT * FROM categories ORDER BY id');
  return rows;
}

export async function saveCategories(categories: Category[]): Promise<void> {
  // This is now handled by individual operations (add, update, delete)
  // Keeping for backward compatibility but not used
}

export async function getBooks(): Promise<Book[]> {
  const { rows } = await query<Book>('SELECT id, title, author, year, categoryId as "categoryId" FROM books ORDER BY id');
  return rows;
}

export async function saveBooks(books: Book[]): Promise<void> {
  // This is now handled by individual operations (add, update, delete)
  // Keeping for backward compatibility but not used
}

// New database-specific functions
export async function addCategory(category: Omit<Category, 'id'>): Promise<Category> {
  const { rows } = await query<Category>(
    'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
    [category.name, category.description]
  );
  return rows[0];
}

export async function updateCategory(id: number, category: Omit<Category, 'id'>): Promise<Category | null> {
  const { rows } = await query<Category>(
    'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    [category.name, category.description, id]
  );
  return rows[0] || null;
}

export async function deleteCategory(id: number): Promise<boolean> {
  const result = await pool.query('DELETE FROM categories WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
}

export async function getCategoryById(id: number): Promise<Category | null> {
  const { rows } = await query<Category>('SELECT * FROM categories WHERE id = $1', [id]);
  return rows[0] || null;
}

export async function addBook(book: Omit<Book, 'id'>): Promise<Book> {
  const { rows } = await query<Book>(
    'INSERT INTO books (title, author, year, categoryId) VALUES ($1, $2, $3, $4) RETURNING id, title, author, year, categoryId as "categoryId"',
    [book.title, book.author, book.year, book.categoryId]
  );
  return rows[0];
}

export async function updateBook(id: number, book: Omit<Book, 'id'>): Promise<Book | null> {
  const { rows } = await query<Book>(
    'UPDATE books SET title = $1, author = $2, year = $3, categoryId = $4 WHERE id = $5 RETURNING id, title, author, year, categoryId as "categoryId"',
    [book.title, book.author, book.year, book.categoryId, id]
  );
  return rows[0] || null;
}

export async function deleteBook(id: number): Promise<boolean> {
  const result = await pool.query('DELETE FROM books WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
}

export async function getBookById(id: number): Promise<Book | null> {
  const { rows } = await query<Book>('SELECT id, title, author, year, categoryId as "categoryId" FROM books WHERE id = $1', [id]);
  return rows[0] || null;
}

export async function getBooksByCategory(categoryId: number): Promise<Book[]> {
  const { rows } = await query<Book>('SELECT id, title, author, year, categoryId as "categoryId" FROM books WHERE categoryId = $1 ORDER BY id', [categoryId]);
  return rows;
}

export async function checkCategoryHasBooks(categoryId: number): Promise<boolean> {
  const { rows } = await query<{ count: string }>('SELECT COUNT(*) as count FROM books WHERE categoryId = $1', [categoryId]);
  return parseInt(rows[0].count) > 0;
}
