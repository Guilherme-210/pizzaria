import { AppError } from "@errors/AppError";
import { NextFunction, Request, Response } from "express";

/**
 * Middleware para tratamento de erros na aplicação
 *
 * @param error
 * @param _req
 * @param res
 * @param _next
 * @returns
 */
function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message,
    });
  }

  return res.status(500).json({
    error: "Internal server error",
  });
}

export { errorMiddleware };
