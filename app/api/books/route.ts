import { NextResponse } from "next/server"
import type { Book } from "@/types/book"

// Mock database
let books: Book[] = [
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

// Get all books
export async function GET(request: Request) {
  // In a real implementation, you would:
  // 1. Verify JWT token
  // 2. Query database for books

  // Make sure books is defined and is an array
  if (!Array.isArray(books)) {
    books = []
  }

  return NextResponse.json(books)
}

// Create a new book
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, author, isbn, publishedYear, description } = body

    // Validate input
    if (!title || !author || !isbn) {
      return NextResponse.json({ error: "Title, author, and ISBN are required" }, { status: 400 })
    }

    // Create new book
    const newBook: Book = {
      id: `book-${Date.now()}`,
      title,
      author,
      isbn,
      publishedYear: publishedYear || new Date().getFullYear(),
      description,
    }

    // Add to mock database
    books.push(newBook)

    return NextResponse.json(newBook, { status: 201 })
  } catch (error) {
    console.error("Create book error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

