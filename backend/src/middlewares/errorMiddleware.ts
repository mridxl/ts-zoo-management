import type { Request, Response, NextFunction } from "express";
import type { CustomError } from "../utlis";

const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
  const status = "failed";

  res.status(statusCode).json({
    status,
    message,
  });
};

export default errorMiddleware;
