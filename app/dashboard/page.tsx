"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import BookList from "@/components/book-list"
import AddBookForm from "@/components/add-book-form"
import type { Book } from "@/types/book"

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          router.push("/login")
          return
        }

        // Fetch books
        await fetchBooks()
      } catch (error) {
        console.error("Authentication error:", error)
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  const fetchBooks = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:5000/api/books", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
  
      // ✅ Normalize _id to id
      const normalizedBooks = Array.isArray(response.data)
        ? response.data.map((book) => ({
            ...book,
            id: book._id,
          }))
        : []
  
      setBooks(normalizedBooks)
    } catch (error) {
      console.error("Error fetching books:", error)
      toast({
        title: "Error",
        description: "Failed to fetch books.",
        variant: "destructive",
      })
      setBooks([])
    } finally {
      setLoading(false)
    }
  }
  

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.push("/login")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  const handleAddBook = async (book: Omit<Book, "id">) => {
    try {
      // This would be replaced with your actual API endpoint
      const response = await axios.post("http://localhost:5000/api/books", book, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      // Make sure we have a valid response before updating state
      if (response.data && response.data.id) {
        setBooks((prevBooks) => [...prevBooks, response.data])
        setShowAddForm(false)
        toast({
          title: "Book added",
          description: "The book has been added successfully.",
        })
      }
    } catch (error) {
      console.error("Error adding book:", error)
      toast({
        title: "Error",
        description: "Failed to add book.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateBook = async (updatedBook: Book) => {
    try {
      // This would be replaced with your actual API endpoint
      await axios.put(`http://localhost:5000/api/books/${updatedBook.id}`, updatedBook, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      setBooks((prevBooks) => prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book)))

      toast({
        title: "Book updated",
        description: "The book has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating book:", error)
      toast({
        title: "Error",
        description: "Failed to update book.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteBook = async (id: string) => {
    try {
      // This would be replaced with your actual API endpoint
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id))

      toast({
        title: "Book deleted",
        description: "The book has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting book:", error)
      toast({
        title: "Error",
        description: "Failed to delete book.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Library Management System</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Book Collection</h2>
          <Button onClick={() => setShowAddForm(!showAddForm)}>{showAddForm ? "Cancel" : "Add New Book"}</Button>
        </div>

        {showAddForm && <AddBookForm onSubmit={handleAddBook} onCancel={() => setShowAddForm(false)} />}

        <BookList books={books} loading={loading} onUpdate={handleUpdateBook} onDelete={handleDeleteBook} />
      </main>
    </div>
  )
}