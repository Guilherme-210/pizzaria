import { DeleteUserService } from "@/services/users-services/deleteUser.service";
import { NextFunction, Request, Response } from "express";

class DeleteUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const deleteUserService = new DeleteUserService();
      const result = await deleteUserService.execute(id);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export { DeleteUserController };
