import { Request, Response } from "express"
import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { readJSON, writeJSON } from "../utils/fileHandler";
import { v4 as uuidv4 } from "uuid";

// register request format
interface RegisterUserBody {
  email: string;
  password: string;
}

//user file path
const USERS_FILE = "./src/data/users.json";

//POST- api/register - for registering user
export const registerUser = async (req: Request<{}, {}, RegisterUserBody>, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "All fields required" });
      return;
    }
    const users = await readJSON<User>(USERS_FILE);

    if (users.find(u => u.email === email)) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: uuidv4(),
      email,
      password: hashedPassword
    };
    users.push(newUser);
    await writeJSON(USERS_FILE, users);
    res.status(201).json({ message: "user registered successfully" });
    return
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    return
  }
}

//POST- api/login - for login a user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: { email: string, password: string } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const users = await readJSON<User>(USERS_FILE);
    const user = users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return
    }

    const token: string = jwt.sign({ id: user.id, email: user.email },
      process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
