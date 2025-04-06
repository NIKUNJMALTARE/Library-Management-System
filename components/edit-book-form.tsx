// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import type { Book } from "@/types/book"

// interface EditBookFormProps {
//   book: Book
//   onSubmit: (book: Book) => void
//   onCancel: () => void
// }

// export default function EditBookForm({ book, onSubmit, onCancel }: EditBookFormProps) {
//   const [title, setTitle] = useState(book.title)
//   const [author, setAuthor] = useState(book.author)
//   const [isbn, setIsbn] = useState(book.isbn)
//   const [publishedYear, setPublishedYear] = useState(book.publishedYear.toString())
//   const [description, setDescription] = useState(book.description || "")

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onSubmit({
//       ...book,
//       title,
//       author,
//       isbn,
//       publishedYear: Number.parseInt(publishedYear) || new Date().getFullYear(),
//       description,
//     })
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Edit Book</CardTitle>
//       </CardHeader>
//       <form onSubmit={handleSubmit}>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="edit-title">Title</Label>
//             <Input id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="edit-author">Author</Label>
//             <Input id="edit-author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="edit-isbn">ISBN</Label>
//             <Input id="edit-isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="edit-publishedYear">Published Year</Label>
//             <Input
//               id="edit-publishedYear"
//               type="number"
//               value={publishedYear}
//               onChange={(e) => setPublishedYear(e.target.value)}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="edit-description">Description</Label>
//             <Textarea
//               id="edit-description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows={3}
//             />
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-end space-x-2">
//           <Button type="button" variant="outline" onClick={onCancel}>
//             Cancel
//           </Button>
//           <Button type="submit">Update Book</Button>
//         </CardFooter>
//       </form>
//     </Card>
//   )
// }

"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Book } from "@/types/book"

interface EditBookFormProps {
  book: Book
  onSubmit: (book: Book) => void
  onCancel: () => void
}

export default function EditBookForm({ book, onSubmit, onCancel }: EditBookFormProps) {
  const [title, setTitle] = useState(book.title || "")
  const [author, setAuthor] = useState(book.author || "")
  const [isbn, setIsbn] = useState(book.isbn || "")
  const [publishedYear, setPublishedYear] = useState(book.publishedYear?.toString() || "")
  const [description, setDescription] = useState(book.description || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit({
      ...book,
      title,
      author,
      isbn,
      publishedYear: Number.parseInt(publishedYear) || new Date().getFullYear(),
      description,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Book</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-author">Author</Label>
            <Input
              id="edit-author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-isbn">ISBN</Label>
            <Input
              id="edit-isbn"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-publishedYear">Published Year</Label>
            <Input
              id="edit-publishedYear"
              type="number"
              value={publishedYear}
              onChange={(e) => setPublishedYear(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Update Book</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
