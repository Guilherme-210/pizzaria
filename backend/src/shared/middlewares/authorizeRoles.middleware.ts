// backend/src/shared/middlewares/authorizeRoles.middleware.ts

import { NextFunction, Request, Response } from "express";
import prisma from "@/lib/prisma";
import { AppError } from "../errors/AppError";
import { Role } from "@/generated/prisma/enums";

/**
 * Creates a middleware that restricts access to users with specific roles.
 *
 * This middleware must be executed after `isAuthenticated`, since it relies on
 * `req.userId` to identify the authenticated user.
 *
 * Execution flow:
 * 1. Retrieves the authenticated user's ID from the request.
 * 2. Loads the user from the database.
 * 3. Verifies whether the user's role is included in the allowed roles.
 * 4. Calls `next()` when authorization succeeds.
 *
 * Throws:
 * - 401 if the request is not authenticated.
 * - 403 if the user does not exist or does not have permission.
 *
 * @param allowedRoles List of roles allowed to access the route.
 * @returns An Express middleware responsible for role-based authorization.
 *
 * @example Exemplo de uso:
 * * authorizeRoles("CUSTOMER")
 * * authorizeRoles("ATTENDANT", "KITCHEN", "MANAGER", "ADMIN", "SUPER_ADMIN")
 * * authorizeRoles("MANAGER", "ADMIN", "SUPER_ADMIN")
 * * authorizeRoles("ADMIN", "SUPER_ADMIN")
 * * authorizeRoles("SUPER_ADMIN")
 */
export function authorizeRoles(...allowedRoles: Role[]) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const userId = req.userId;

    if (!userId) {
      throw new AppError("Usuario não autenticado", 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.active) {
      throw new AppError("Usuario não encontrado", 403);
    }

    if (!allowedRoles.includes(user.role)) {
      throw new AppError("Usuario sem permissão", 403);
    }

    next();
  };
}
