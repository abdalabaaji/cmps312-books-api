# Database Setup Guide

This API now uses **Vercel Postgres** instead of JSON files for data storage.

## Setup on Vercel (Recommended)

### 1. Create a Vercel Postgres Database

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (or create a new one)
3. Go to the **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a name for your database
7. Select your region (choose closest to your users)
8. Click **Create**

### 2. Connect Database to Your Project

1. After creating the database, Vercel will automatically add environment variables to your project
2. The following variables will be set automatically:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

### 3. Initialize Database Tables

After deployment, you need to run the setup script to create tables and seed data:

**Option A: Using Vercel CLI**
```bash
vercel env pull .env.local
npm run setup-db
```

**Option B: Using Vercel Dashboard**
1. Go to your project's **Functions** tab
2. Create a new function or trigger the setup endpoint
3. Or run the setup script locally with production credentials

### 4. Deploy Your Application

```bash
git add .
git commit -m "Add Vercel Postgres support"
git push
```

Vercel will automatically deploy your changes.

## Local Development Setup

### 1. Get Database Credentials

```bash
# Pull environment variables from Vercel
vercel env pull .env.local
```

### 2. Initialize Database

```bash
npm run setup-db
```

### 3. Start Development Server

```bash
npm run dev
```

## Database Schema

### Categories Table
```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
)
```

### Books Table
```sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  categoryId INTEGER NOT NULL REFERENCES categories(id)
)
```

## Troubleshooting

### "Connection refused" or "Database not found"

- Make sure you've created a Postgres database in Vercel
- Make sure environment variables are set in your Vercel project
- For local development, run `vercel env pull .env.local`

### "Tables already exist"

This is fine! The setup script checks for existing data before seeding.

### Resetting the Database

To completely reset your database:

1. Go to Vercel Dashboard > Storage > Your Database
2. Go to the **Data** tab
3. Run these queries:
```sql
DROP TABLE books;
DROP TABLE categories;
```
4. Run `npm run setup-db` again

## API Endpoints

All endpoints remain the same as before:

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

- `GET /api/books` - Get all books
- `GET /api/books?categoryId=:id` - Get books by category
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book
