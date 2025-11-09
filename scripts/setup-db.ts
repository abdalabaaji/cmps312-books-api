import { Client } from 'pg';

async function setupDatabase() {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('No database connection string found. Set POSTGRES_URL or DATABASE_URL environment variable.');
  }

  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log('✓ Connected to database');
    console.log('Creating tables...');

    // Create categories table
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL
      )
    `);
    console.log('✓ Categories table created');

    // Create books table
    await client.query(`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        year INTEGER NOT NULL,
        categoryId INTEGER NOT NULL REFERENCES categories(id)
      )
    `);
    console.log('✓ Books table created');

    // Check if data already exists
    const categoryResult = await client.query('SELECT COUNT(*) as count FROM categories');
    const categoryCount = parseInt(categoryResult.rows[0].count);

    if (categoryCount === 0) {
      console.log('Seeding categories...');

      // Insert categories
      await client.query(`
        INSERT INTO categories (name, description) VALUES
        ('Classic Literature', 'Timeless works of fiction that have shaped literary history'),
        ('Science Fiction', 'Imaginative stories exploring futuristic concepts and technology'),
        ('Mystery & Thriller', 'Suspenseful tales of crime, investigation, and intrigue'),
        ('Fantasy', 'Epic adventures in magical worlds and mythical realms')
      `);
      console.log('✓ Categories seeded');

      console.log('Seeding books...');

      // Insert books
      await client.query(`
        INSERT INTO books (title, author, year, categoryId) VALUES
        ('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 1),
        ('To Kill a Mockingbird', 'Harper Lee', 1960, 1),
        ('Pride and Prejudice', 'Jane Austen', 1813, 1),
        ('Moby-Dick', 'Herman Melville', 1851, 1),
        ('Wuthering Heights', 'Emily Brontë', 1847, 1),
        ('Dune', 'Frank Herbert', 1965, 2),
        ('1984', 'George Orwell', 1949, 2),
        ('The Hitchhiker''s Guide to the Galaxy', 'Douglas Adams', 1979, 2),
        ('Foundation', 'Isaac Asimov', 1951, 2),
        ('Neuromancer', 'William Gibson', 1984, 2),
        ('The Da Vinci Code', 'Dan Brown', 2003, 3),
        ('Gone Girl', 'Gillian Flynn', 2012, 3),
        ('The Girl with the Dragon Tattoo', 'Stieg Larsson', 2005, 3),
        ('Sherlock Holmes: The Complete Novels', 'Arthur Conan Doyle', 1892, 3),
        ('Murder on the Orient Express', 'Agatha Christie', 1934, 3),
        ('The Hobbit', 'J.R.R. Tolkien', 1937, 4),
        ('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', 1997, 4),
        ('The Name of the Wind', 'Patrick Rothfuss', 2007, 4),
        ('A Game of Thrones', 'George R.R. Martin', 1996, 4),
        ('The Chronicles of Narnia', 'C.S. Lewis', 1950, 4)
      `);
      console.log('✓ Books seeded');
    } else {
      console.log('Database already contains data, skipping seed');
    }

    console.log('\n✅ Database setup completed successfully!');
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  } finally {
    await client.end();
  }
}

setupDatabase();
