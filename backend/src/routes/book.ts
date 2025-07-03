import express, { Router } from "express";
import { getBooks, getBookById, addBook, updateBook, deleteBook } from "../controllers/book";
import { validateToken } from "../middlewares/validateToken";
const router: Router = express.Router();

//middleware
router.use(validateToken);

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;