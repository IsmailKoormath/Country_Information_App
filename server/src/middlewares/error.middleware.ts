import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exception/httpException";

export function errorHandling(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";

    res.status(status).json({
      Error: `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`,
    });
  } catch (error) {
    next(error);
  }
}
