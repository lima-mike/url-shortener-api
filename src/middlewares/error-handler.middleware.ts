import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("errorHandlerMW", err.message);
  res.status(500).json({ error: err.message || "Internal Server Error" });
};
