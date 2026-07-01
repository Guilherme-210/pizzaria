import { UpdateUserService } from "@/services/users-services/updateUser.service";
import { NextFunction, Request, Response } from "express";

class UpdateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId as string;

      const { name, email, password } = req.body;

      const updateUserService = new UpdateUserService();
      const result = await updateUserService.execute({
        userId,
        name,
        email,
        password,
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export { UpdateUserController };

