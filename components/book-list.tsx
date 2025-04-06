"use client"

import { useState } from "react"
import type { Book } from "@/types/book"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2, Loader2 } from "lucide-react"
import EditBookForm from "./edit-book-form"

interface BookListProps {
  books?: Book[]
  loading: boolean
  onUpdate: (book: Book) => void
  onDelete: (id: string) => void
}

export default function BookList({ books = [], loading, onUpdate, onDelete }: BookListProps) {
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading books...</span>
      </div>
    )
  }

  // Ensure books is an array before using map
  const booksArray = Array.isArray(books) ? books : []

  if (booksArray.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No books found. Add a new book to get started.</p>
      </div>
    )
  }

  return (
    <div>
      {editingBook && (
        <div className="mb-6">
          <EditBookForm
            book={editingBook}
            onSubmit={(updatedBook) => {
              onUpdate(updatedBook)
              setEditingBook(null)
            }}
            onCancel={() => setEditingBook(null)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booksArray.map((book) => (
          <Card key={String(book.id)}>
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Author:</span> {book.author}
                </p>
                <p>
                  <span className="font-medium">ISBN:</span> {book.isbn}
                </p>
                <p>
                  <span className="font-medium">Published:</span> {book.publishedYear}
                </p>
                {book.description && (
                  <p>
                    <span className="font-medium">Description:</span> {book.description}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => setEditingBook(book)}>
                <Pencil className="h-4 w-4 mr-1" /> Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(book.id)}>
                <Trash2 className="h-4 w-4 mr-1" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

