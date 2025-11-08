# Books API

A simple CRUD REST API for managing books and categories, built with Next.js 15 for the **CMPS312 Mobile App Dev** course.

## Features

- 📚 Full CRUD operations for Books and Categories
- 🔄 RESTful API design
- 💾 File-based JSON storage
- 🌐 CORS enabled for Flutter apps
- 📖 Interactive API documentation
- 🚀 Ready for Vercel deployment

## API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create a new category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Books
- `GET /api/books` - Get all books (supports `?categoryId=` filter)
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view the API documentation.

4. Test the API endpoints using curl or any HTTP client:
```bash
# Get all categories
curl http://localhost:3000/api/categories

# Get all books
curl http://localhost:3000/api/books

# Create a new category
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Biography", "description": "Life stories"}'
```

## Deploy to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. Push this repository to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/books-api.git
git push -u origin main
```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "New Project"

4. Import your GitHub repository

5. Vercel will automatically detect Next.js and deploy

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts and your API will be live!

## Project Structure

```
books_api/
├── app/
│   ├── api/
│   │   ├── categories/
│   │   │   ├── route.ts          # Categories endpoints
│   │   │   └── [id]/
│   │   │       └── route.ts      # Single category endpoints
│   │   └── books/
│   │       ├── route.ts          # Books endpoints
│   │       └── [id]/
│   │           └── route.ts      # Single book endpoints
│   ├── layout.tsx
│   ├── page.tsx                  # API documentation page
│   └── globals.css
├── data/
│   ├── books.json               # Books data store
│   └── categories.json          # Categories data store
├── lib/
│   └── db.ts                    # Database utilities
├── package.json
├── next.config.js
├── tsconfig.json
└── vercel.json
```

## Data Models

### Category
```typescript
{
  id: number;
  name: string;
  description: string;
}
```

### Book
```typescript
{
  id: number;
  title: string;
  author: string;
  year: number;
  categoryId: number;
}
```

## Notes

- Data is persisted to JSON files in the `data/` directory
- In production (Vercel), changes will persist only for the duration of the serverless function execution
- For permanent storage in production, consider using Vercel KV, PostgreSQL, or another database solution

## Course Information

**Course:** CMPS312 Mobile App Dev
**Purpose:** Tutorial Lab - API Integration with Flutter using Dio

## License

MIT
