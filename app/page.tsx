export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Books API Documentation</h1>
        <p className="text-sm text-blue-600 font-semibold mb-4">CMPS312 Mobile App Dev</p>
        <p className="text-gray-600 mb-8">
          A simple CRUD API for managing books and categories. Built with Next.js for the CMPS312 Flutter Tutorial.
        </p>

        {/* Base URL Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Base URL</h2>
          <div className="bg-gray-100 rounded p-4 font-mono text-sm">
            <p className="text-blue-600">https://cmps312-books-api.vercel.app</p>
          </div>
        </section>

        {/* Categories Endpoints */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
            Categories Endpoints
          </h2>

          {/* GET all categories */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-semibold text-sm">GET</span>
              <code className="text-lg font-mono text-gray-700">/api/categories</code>
            </div>
            <p className="text-gray-600 mb-3">Get all categories</p>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <p className="text-gray-400 text-xs mb-2">Response (200 OK):</p>
              <pre className="text-green-400 text-sm">{`[
  {
    "id": 1,
    "name": "Classic Literature",
    "description": "Timeless works of fiction..."
  }
]`}</pre>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900 font-semibold text-sm mb-2">Dart/Flutter Example:</p>
              <pre className="text-sm text-gray-800 overflow-x-auto">{`final response = await dio.get('/api/categories');
List<Category> categories = (response.data as List)
    .map((json) => Category.fromJson(json))
    .toList();`}</pre>
            </div>
          </div>

          {/* GET category by ID */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-semibold text-sm">GET</span>
              <code className="text-lg font-mono text-gray-700">/api/categories/:id</code>
            </div>
            <p className="text-gray-600 mb-3">Get a specific category by ID</p>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <p className="text-gray-400 text-xs mb-2">Response (200 OK):</p>
              <pre className="text-green-400 text-sm">{`{
  "id": 1,
  "name": "Classic Literature",
  "description": "Timeless works of fiction..."
}`}</pre>
            </div>
          </div>

          {/* POST category */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-semibold text-sm">POST</span>
              <code className="text-lg font-mono text-gray-700">/api/categories</code>
            </div>
            <p className="text-gray-600 mb-3">Create a new category</p>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-3">
              <p className="text-gray-400 text-xs mb-2">Request Body:</p>
              <pre className="text-yellow-400 text-sm">{`{
  "name": "Biography",
  "description": "Life stories of notable people"
}`}</pre>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <p className="text-gray-400 text-xs mb-2">Response (201 Created):</p>
              <pre className="text-green-400 text-sm">{`{
  "id": 5,
  "name": "Biography",
  "description": "Life stories of notable people"
}`}</pre>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900 font-semibold text-sm mb-2">Dart/Flutter Example:</p>
              <pre className="text-sm text-gray-800 overflow-x-auto">{`final response = await dio.post(
  '/api/categories',
  data: {
    'name': 'Biography',
    'description': 'Life stories of notable people',
  },
);
Category newCategory = Category.fromJson(response.data);`}</pre>
            </div>
          </div>

          {/* PUT category */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded font-semibold text-sm">PUT</span>
              <code className="text-lg font-mono text-gray-700">/api/categories/:id</code>
            </div>
            <p className="text-gray-600 mb-3">Update an existing category</p>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <p className="text-gray-400 text-xs mb-2">Request Body:</p>
              <pre className="text-yellow-400 text-sm">{`{
  "name": "Updated Name",
  "description": "Updated description"
}`}</pre>
            </div>
          </div>

          {/* DELETE category */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded font-semibold text-sm">DELETE</span>
              <code className="text-lg font-mono text-gray-700">/api/categories/:id</code>
            </div>
            <p className="text-gray-600 mb-3">Delete a category (only if it has no books)</p>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <p className="text-gray-400 text-xs mb-2">Response (200 OK):</p>
              <pre className="text-green-400 text-sm">{`{
  "message": "Category deleted successfully"
}`}</pre>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-3">
              <p className="text-red-900 text-sm">
                <strong>Note:</strong> Cannot delete a category that has books. Delete the books first.
              </p>
            </div>
          </div>
        </section>

        {/* Books Endpoints */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-purple-500 pb-2">
            Books Endpoints
          </h2>

          {/* GET all books */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-semibold text-sm">GET</span>
              <code className="text-lg font-mono text-gray-700">/api/books</code>
            </div>
            <p className="text-gray-600 mb-3">Get all books (optional: filter by categoryId)</p>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-3">
              <p className="text-gray-400 text-xs mb-2">Query Parameters (optional):</p>
              <pre className="text-yellow-400 text-sm">{`?categoryId=1  // Filter by category`}</pre>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <p className="text-gray-400 text-xs mb-2">Response (200 OK):</p>
              <pre className="text-green-400 text-sm">{`[
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "year": 1925,
    "categoryId": 1
  }
]`}</pre>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900 font-semibold text-sm mb-2">Dart/Flutter Example:</p>
              <pre className="text-sm text-gray-800 overflow-x-auto">{`// Get all books
final response = await dio.get('/api/books');

// Get books by category
final response = await dio.get(
  '/api/books',
  queryParameters: {'categoryId': 1},
);`}</pre>
            </div>
          </div>

          {/* GET book by ID */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-semibold text-sm">GET</span>
              <code className="text-lg font-mono text-gray-700">/api/books/:id</code>
            </div>
            <p className="text-gray-600 mb-3">Get a specific book by ID</p>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <p className="text-gray-400 text-xs mb-2">Response (200 OK):</p>
              <pre className="text-green-400 text-sm">{`{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "year": 1925,
  "categoryId": 1
}`}</pre>
            </div>
          </div>

          {/* POST book */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-semibold text-sm">POST</span>
              <code className="text-lg font-mono text-gray-700">/api/books</code>
            </div>
            <p className="text-gray-600 mb-3">Create a new book</p>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-3">
              <p className="text-gray-400 text-xs mb-2">Request Body:</p>
              <pre className="text-yellow-400 text-sm">{`{
  "title": "New Book",
  "author": "Author Name",
  "year": 2024,
  "categoryId": 1
}`}</pre>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <p className="text-gray-400 text-xs mb-2">Response (201 Created):</p>
              <pre className="text-green-400 text-sm">{`{
  "id": 21,
  "title": "New Book",
  "author": "Author Name",
  "year": 2024,
  "categoryId": 1
}`}</pre>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900 font-semibold text-sm mb-2">Dart/Flutter Example:</p>
              <pre className="text-sm text-gray-800 overflow-x-auto">{`final response = await dio.post(
  '/api/books',
  data: {
    'title': 'New Book',
    'author': 'Author Name',
    'year': 2024,
    'categoryId': 1,
  },
);
Book newBook = Book.fromJson(response.data);`}</pre>
            </div>
          </div>

          {/* PUT book */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded font-semibold text-sm">PUT</span>
              <code className="text-lg font-mono text-gray-700">/api/books/:id</code>
            </div>
            <p className="text-gray-600 mb-3">Update an existing book</p>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <p className="text-gray-400 text-xs mb-2">Request Body:</p>
              <pre className="text-yellow-400 text-sm">{`{
  "title": "Updated Title",
  "author": "Updated Author",
  "year": 2024,
  "categoryId": 1
}`}</pre>
            </div>
          </div>

          {/* DELETE book */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded font-semibold text-sm">DELETE</span>
              <code className="text-lg font-mono text-gray-700">/api/books/:id</code>
            </div>
            <p className="text-gray-600 mb-3">Delete a book</p>

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <p className="text-gray-400 text-xs mb-2">Response (200 OK):</p>
              <pre className="text-green-400 text-sm">{`{
  "message": "Book deleted successfully"
}`}</pre>
            </div>
          </div>
        </section>

        {/* Error Responses */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Error Responses</h2>

          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="font-semibold text-red-900 mb-2">400 Bad Request</p>
              <pre className="text-sm text-gray-800">{`{ "error": "Name and description are required" }`}</pre>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-semibold text-yellow-900 mb-2">404 Not Found</p>
              <pre className="text-sm text-gray-800">{`{ "error": "Category not found" }`}</pre>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="font-semibold text-orange-900 mb-2">500 Internal Server Error</p>
              <pre className="text-sm text-gray-800">{`{ "error": "Failed to fetch categories" }`}</pre>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Built with Next.js 15 • CMPS312 Mobile App Dev Tutorial Lab
          </p>
        </footer>
      </div>
    </main>
  );
}
