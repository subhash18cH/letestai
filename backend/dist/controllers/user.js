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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fileHandler_1 = require("../utils/fileHandler");
const uuid_1 = require("uuid");
//user file path
const USERS_FILE = "./src/data/users.json";
//POST- api/register - for registering user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "All fields required" });
            return;
        }
        const users = yield (0, fileHandler_1.readJSON)(USERS_FILE);
        if (users.find(u => u.email === email)) {
            res.status(400).json({ message: "Email already registered" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = {
            id: (0, uuid_1.v4)(),
            email,
            password: hashedPassword
        };
        users.push(newUser);
        yield (0, fileHandler_1.writeJSON)(USERS_FILE, users);
        res.status(201).json({ message: "user registered successfully" });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "something went wrong" });
        return;
    }
});
exports.registerUser = registerUser;
//POST- api/login - for login a user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const users = yield (0, fileHandler_1.readJSON)(USERS_FILE);
        const user = users.find(u => u.email === email);
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.loginUser = loginUser;
