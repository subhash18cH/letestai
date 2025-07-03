import { Request, Response } from "express"
import { Book } from "../models/book";
import { readJSON, writeJSON } from "../utils/fileHandler";
import { v4 as uuidv4 } from "uuid";
import { AuthRequest } from "../middlewares/validateToken";

const BOOKS_FILE = "./src/data/books.json";

//GET- api/books -  List all books  
export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await readJSON<Book>(BOOKS_FILE);
    res.json(books);
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

//GET- api/books/:id -  Get book by ID  
export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await readJSON<Book>(BOOKS_FILE);
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

//POST- api/books -  Add a new book  
export const addBook = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, author, genre, publishedYear }: { title: string, author: string, genre: string, publishedYear: number } = req.body;

    const books = await readJSON<Book>(BOOKS_FILE);
    const newBook: Book = {
      id: uuidv4(),
      title,
      author,
      genre,
      publishedYear,
      userId: req.user!.id,
    };
    books.push(newBook);
    await writeJSON(BOOKS_FILE, books);
    res.status(201).json(newBook);
    return
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

//PUT- api/books/:id -   Update a book by ID   
export const updateBook = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const books = await readJSON<Book>(BOOKS_FILE);
    const bookIndex = books.findIndex(b => b.id === req.params.id);
    if (bookIndex === -1) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    if (books[bookIndex].userId !== req.user!.id) {
      res.status(403).json({ message: "Unauthorized" });
      return
    }
    books[bookIndex] = { ...books[bookIndex], ...req.body };
    await writeJSON(BOOKS_FILE, books);
    res.json(books[bookIndex]);
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

//DELETE- api/books/:id -   Delete a book by ID   
export const deleteBook = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let books = await readJSON<Book>(BOOKS_FILE);
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return
    }
    if (book.userId !== req.user!.id) {
      res.status(403).json({ message: "Unauthorized" });
      return
    }

    books = books.filter(b => b.id !== req.params.id);
    await writeJSON(BOOKS_FILE, books);
    res.json({ message: "Book deleted" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}


