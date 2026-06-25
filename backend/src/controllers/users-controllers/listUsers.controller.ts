import { ListUsersService } from "@/services/users-services/listUsers.service";
import { NextFunction, Request, Response } from "express";

class ListUsersController {
  async handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const listUsersService = new ListUsersService();
      const users = await listUsersService.execute();

      return res.status(200).json(users);
    } catch (error) {
      return next(error);
    }
  }
}

export { ListUsersController };
