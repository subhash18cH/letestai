"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.addBook = exports.getBookById = exports.getBooks = void 0;
const fileHandler_1 = require("../utils/fileHandler");
const uuid_1 = require("uuid");
const BOOKS_FILE = "./src/data/books.json";
//GET- api/books -  List all books  
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield (0, fileHandler_1.readJSON)(BOOKS_FILE);
        res.json(books);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getBooks = getBooks;
//GET- api/books/:id -  Get book by ID  
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield (0, fileHandler_1.readJSON)(BOOKS_FILE);
        const book = books.find(b => b.id === req.params.id);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        res.json(book);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getBookById = getBookById;
//POST- api/books -  Add a new book  
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, genre, publishedYear } = req.body;
        const books = yield (0, fileHandler_1.readJSON)(BOOKS_FILE);
        const newBook = {
            id: (0, uuid_1.v4)(),
            title,
            author,
            genre,
            publishedYear,
            userId: req.user.id,
        };
        books.push(newBook);
        yield (0, fileHandler_1.writeJSON)(BOOKS_FILE, books);
        res.status(201).json(newBook);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.addBook = addBook;
//PUT- api/books/:id -   Update a book by ID   
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield (0, fileHandler_1.readJSON)(BOOKS_FILE);
        const bookIndex = books.findIndex(b => b.id === req.params.id);
        if (bookIndex === -1) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        if (books[bookIndex].userId !== req.user.id) {
            res.status(403).json({ message: "Unauthorized" });
            return;
        }
        books[bookIndex] = Object.assign(Object.assign({}, books[bookIndex]), req.body);
        yield (0, fileHandler_1.writeJSON)(BOOKS_FILE, books);
        res.json(books[bookIndex]);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateBook = updateBook;
//DELETE- api/books/:id -   Delete a book by ID   
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let books = yield (0, fileHandler_1.readJSON)(BOOKS_FILE);
        const book = books.find(b => b.id === req.params.id);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        if (book.userId !== req.user.id) {
            res.status(403).json({ message: "Unauthorized" });
            return;
        }
        books = books.filter(b => b.id !== req.params.id);
        yield (0, fileHandler_1.writeJSON)(BOOKS_FILE, books);
        res.json({ message: "Book deleted" });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.deleteBook = deleteBook;
