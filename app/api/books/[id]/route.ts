import { NextRequest, NextResponse } from 'next/server';
import { getBooks, saveBooks, getCategories } from '@/lib/db';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// GET /api/books/[id] - Get a book by ID
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const bookId = parseInt(id);

    const books = await getBooks();
    const book = books.find(b => b.id === bookId);

    if (!book) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch book' },
      { status: 500 }
    );
  }
}

// PUT /api/books/[id] - Update a book
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const bookId = parseInt(id);
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
    const index = books.findIndex(b => b.id === bookId);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      );
    }

    books[index] = {
      id: bookId,
      title,
      author,
      year: parseInt(year.toString()),
      categoryId: parseInt(categoryId.toString()),
    };

    await saveBooks(books);
    return NextResponse.json(books[index]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update book' },
      { status: 500 }
    );
  }
}

// DELETE /api/books/[id] - Delete a book
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const bookId = parseInt(id);

    const books = await getBooks();
    const index = books.findIndex(b => b.id === bookId);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      );
    }

    books.splice(index, 1);
    await saveBooks(books);

    return NextResponse.json({ message: 'Book deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete book' },
      { status: 500 }
    );
  }
}
