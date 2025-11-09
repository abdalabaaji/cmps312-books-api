import { NextRequest, NextResponse } from 'next/server';
import { getBooks, getBooksByCategory, addBook, getCategoryById } from '@/lib/db';

// GET /api/books - Get all books or filter by categoryId
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');

    let books;

    // Filter by categoryId if provided
    if (categoryId) {
      const catId = parseInt(categoryId);
      books = await getBooksByCategory(catId);
    } else {
      books = await getBooks();
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
    const category = await getCategoryById(parseInt(categoryId.toString()));

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    const newBook = await addBook({
      title,
      author,
      year: parseInt(year.toString()),
      categoryId: parseInt(categoryId.toString()),
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    );
  }
}
