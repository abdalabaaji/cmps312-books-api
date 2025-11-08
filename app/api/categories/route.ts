import { NextRequest, NextResponse } from 'next/server';
import { getCategories, saveCategories, Category } from '@/lib/db';

// GET /api/categories - Get all categories
export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create a new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    const categories = await getCategories();

    // Generate new ID
    const newId = categories.length > 0
      ? Math.max(...categories.map(c => c.id)) + 1
      : 1;

    const newCategory: Category = {
      id: newId,
      name,
      description,
    };

    categories.push(newCategory);
    await saveCategories(categories);

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
