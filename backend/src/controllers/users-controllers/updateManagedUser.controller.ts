import { UpdateUserService } from "@/services/users-services/updateUser.service";
import { AppError } from "@/shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

class UpdateManagedUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, active, role } = req.body;

      const imageBuffer = req.file?.buffer;
      const imageName = req.file?.originalname;

      if (Object.keys(req.body).length === 0 && !imageBuffer && !imageName) {
        throw new AppError("Informe ao menos um campo para atualizar", 400);
      }

      const result = await new UpdateUserService().execute({
        userId: req.params.id as string,
        name,
        email,
        active,
        imageBuffer,
        imageName,
        role,
        requesterId: req.userId as string,
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export { UpdateManagedUserController };
