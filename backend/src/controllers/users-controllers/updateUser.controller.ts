import { UpdateUserService } from "@/services/users-services/updateUser.service";
import { AppError } from "@/shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

class UpdateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId as string;

      const { name, email, password, active } = req.body;
      const imageBuffer = req.file?.buffer;
      const imageName = req.file?.originalname;

      if (Object.keys(req.body).length === 0 && !imageBuffer && !imageName) {
        throw new AppError("Informe ao menos um campo para atualizar", 400);
      }

      const updateUserService = new UpdateUserService();
      const result = await updateUserService.execute({
        userId,
        name,
        email,
        password,
        active,
        imageBuffer,
        imageName,
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export { UpdateUserController };
