import { Request, Response, NextFunction } from "express";

//helper logger function
export const logRequests = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
};
