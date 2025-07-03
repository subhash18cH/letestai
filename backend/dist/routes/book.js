"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_1 = require("../controllers/book");
const validateToken_1 = require("../middlewares/validateToken");
const router = express_1.default.Router();
//middleware
router.use(validateToken_1.validateToken);
router.get("/", book_1.getBooks);
router.get("/:id", book_1.getBookById);
router.post("/", book_1.addBook);
router.put("/:id", book_1.updateBook);
router.delete("/:id", book_1.deleteBook);
exports.default = router;
