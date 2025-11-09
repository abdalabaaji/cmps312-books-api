import { NextRequest, NextResponse } from 'next/server';
import { getCategoryById, updateCategory, deleteCategory, checkCategoryHasBooks } from '@/lib/db';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// GET /api/categories/[id] - Get a category by ID
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const categoryId = parseInt(id);

    const category = await getCategoryById(categoryId);

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// PUT /api/categories/[id] - Update a category
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const categoryId = parseInt(id);
    const body = await request.json();
    const { name, description } = body;

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    const updatedCategory = await updateCategory(categoryId, { name, description });

    if (!updatedCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id] - Delete a category
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const categoryId = parseInt(id);

    // Check if category has books
    const hasBooks = await checkCategoryHasBooks(categoryId);

    if (hasBooks) {
      return NextResponse.json(
        { error: 'Cannot delete category with books. Delete books first.' },
        { status: 400 }
      );
    }

    const deleted = await deleteCategory(categoryId);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
