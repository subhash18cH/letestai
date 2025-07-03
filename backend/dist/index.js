"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
const book_1 = __importDefault(require("./routes/book"));
const logger_1 = require("./middlewares/logger");
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json());
app.use(logger_1.logRequests);
//auth routes
app.use("/api", user_1.default);
//book routes
app.use("/api/books", book_1.default);
//handles unknown path requests
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
//entry point
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
