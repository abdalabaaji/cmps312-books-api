import { NextRequest, NextResponse } from 'next/server';
import { getBooks, saveBooks, getCategories, Book } from '@/lib/db';

// GET /api/books - Get all books or filter by categoryId
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');

    let books = await getBooks();

    // Filter by categoryId if provided
    if (categoryId) {
      const catId = parseInt(categoryId);
      books = books.filter(b => b.categoryId === catId);
    }

    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}

// POST /api/books - Create a new book
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, author, year, categoryId } = body;

    if (!title || !author || !year || !categoryId) {
      return NextResponse.json(
        { error: 'Title, author, year, and categoryId are required' },
        { status: 400 }
      );
    }

    // Validate category exists
    const categories = await getCategories();
    const categoryExists = categories.some(c => c.id === categoryId);

    if (!categoryExists) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    const books = await getBooks();

    // Generate new ID
    const newId = books.length > 0
      ? Math.max(...books.map(b => b.id)) + 1
      : 1;

    const newBook: Book = {
      id: newId,
      title,
      author,
      year: parseInt(year.toString()),
      categoryId: parseInt(categoryId.toString()),
    };

    books.push(newBook);
    await saveBooks(books);

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    );
  }
}
