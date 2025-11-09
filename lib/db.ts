import { sql } from '@vercel/postgres';

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
  const { rows } = await sql<Category>`SELECT * FROM categories ORDER BY id`;
  return rows;
}

export async function saveCategories(categories: Category[]): Promise<void> {
  // This is now handled by individual operations (add, update, delete)
  // Keeping for backward compatibility but not used
}

export async function getBooks(): Promise<Book[]> {
  const { rows } = await sql<Book>`SELECT * FROM books ORDER BY id`;
  return rows;
}

export async function saveBooks(books: Book[]): Promise<void> {
  // This is now handled by individual operations (add, update, delete)
  // Keeping for backward compatibility but not used
}

// New database-specific functions
export async function addCategory(category: Omit<Category, 'id'>): Promise<Category> {
  const { rows } = await sql<Category>`
    INSERT INTO categories (name, description)
    VALUES (${category.name}, ${category.description})
    RETURNING *
  `;
  return rows[0];
}

export async function updateCategory(id: number, category: Omit<Category, 'id'>): Promise<Category | null> {
  const { rows } = await sql<Category>`
    UPDATE categories
    SET name = ${category.name}, description = ${category.description}
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] || null;
}

export async function deleteCategory(id: number): Promise<boolean> {
  const { rowCount } = await sql`
    DELETE FROM categories WHERE id = ${id}
  `;
  return (rowCount ?? 0) > 0;
}

export async function getCategoryById(id: number): Promise<Category | null> {
  const { rows } = await sql<Category>`
    SELECT * FROM categories WHERE id = ${id}
  `;
  return rows[0] || null;
}

export async function addBook(book: Omit<Book, 'id'>): Promise<Book> {
  const { rows } = await sql<Book>`
    INSERT INTO books (title, author, year, categoryId)
    VALUES (${book.title}, ${book.author}, ${book.year}, ${book.categoryId})
    RETURNING *
  `;
  return rows[0];
}

export async function updateBook(id: number, book: Omit<Book, 'id'>): Promise<Book | null> {
  const { rows } = await sql<Book>`
    UPDATE books
    SET title = ${book.title}, author = ${book.author}, year = ${book.year}, categoryId = ${book.categoryId}
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] || null;
}

export async function deleteBook(id: number): Promise<boolean> {
  const { rowCount } = await sql`
    DELETE FROM books WHERE id = ${id}
  `;
  return (rowCount ?? 0) > 0;
}

export async function getBookById(id: number): Promise<Book | null> {
  const { rows } = await sql<Book>`
    SELECT * FROM books WHERE id = ${id}
  `;
  return rows[0] || null;
}

export async function getBooksByCategory(categoryId: number): Promise<Book[]> {
  const { rows } = await sql<Book>`
    SELECT * FROM books WHERE categoryId = ${categoryId} ORDER BY id
  `;
  return rows;
}

export async function checkCategoryHasBooks(categoryId: number): Promise<boolean> {
  const { rows } = await sql<{ count: string }>`
    SELECT COUNT(*) as count FROM books WHERE categoryId = ${categoryId}
  `;
  return parseInt(rows[0].count) > 0;
}
