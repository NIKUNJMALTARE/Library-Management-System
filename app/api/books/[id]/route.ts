import { NextResponse } from "next/server"
import type { Book } from "@/types/book"

// Mock database - this would be imported from a shared location in a real app
const books: Book[] = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0446310789",
    publishedYear: 1960,
    description: "A classic of modern American literature.",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    publishedYear: 1949,
    description: "A dystopian social science fiction novel.",
  },
  {
    id: "3",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    publishedYear: 1925,
    description: "A novel about the Jazz Age in America.",
  },
]

// Get a single book
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const book = books.find((b) => b.id === id)

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 })
  }

  return NextResponse.json(book)
}

// Update a book
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()
    const { title, author, isbn, publishedYear, description } = body

    // Find book index
    const index = books.findIndex((b) => b.id === id)
    if (index === -1) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    // Update book
    const updatedBook: Book = {
      ...books[index],
      title: title || books[index].title,
      author: author || books[index].author,
      isbn: isbn || books[index].isbn,
      publishedYear: publishedYear || books[index].publishedYear,
      description: description !== undefined ? description : books[index].description,
    }

    books[index] = updatedBook

    return NextResponse.json(updatedBook)
  } catch (error) {
    console.error("Update book error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Delete a book
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find book index
  const index = books.findIndex((b) => b.id === id)
  if (index === -1) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 })
  }

  // Remove book
  books.splice(index, 1)

  return NextResponse.json({ success: true })
}

