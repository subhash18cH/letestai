import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

//extending auth request
export interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const validateToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    const token = typeof authHeader == "string" && authHeader && authHeader.startsWith("Bearer") && authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token missing" });
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: "Invalid token" });
        return;
      }
      req.user = decoded as { id: string; email: string };
      next();
    });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
    return;
  }
};
