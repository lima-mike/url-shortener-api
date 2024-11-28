import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors.util";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error Handler Middleware", err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ status: "error", message: err.message });
  } else {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
