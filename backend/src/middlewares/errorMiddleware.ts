import type { Response } from "express";
import type { CustomError } from "../utlis";


const errorMiddleware = (
  err: CustomError,
  res: Response,
) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong!";
    let status = "failed";

    res.status(statusCode).json({
    status,
    message,
  });
}

export default errorMiddleware;