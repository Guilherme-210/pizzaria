import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

interface IPayload {
  sub: string;
}

function isAuthenticated(req: Request, _res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    throw new AppError("Token de autenticação não fornecido", 401);
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(
      token!,
      process.env.JWT_SECRET as string,
    ) as IPayload;

    req.userId = sub;
  } catch (error) {
    throw new AppError("Token de autenticação inválido", 401);
  }

  next();
}

export { isAuthenticated };
