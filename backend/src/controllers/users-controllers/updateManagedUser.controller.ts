import { UpdateUserService } from "@/services/users-services/updateUser.service";
import { NextFunction, Request, Response } from "express";

class UpdateManagedUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, active, image } = req.body;

      const result = await new UpdateUserService().execute({
        userId: req.params.id as string,
        name,
        email,
        active,
        image,
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export { UpdateManagedUserController };
