import { DeleteUserService } from "@/services/users-services/deleteUser.service";
import { NextFunction, Request, Response } from "express";

class DeleteUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = req.params.user_id as string;
      const deleteUserService = new DeleteUserService();
      const result = await deleteUserService.execute(user_id);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export { DeleteUserController };
