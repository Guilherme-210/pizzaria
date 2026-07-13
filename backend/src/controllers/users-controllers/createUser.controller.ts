import { CreateUserServices } from "@/services/users-services/createUser.service";
import { AppError } from "@/shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

interface ICreateUserController {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

class CreateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, confirmPassword } =
        req.body as ICreateUserController;

      const imageBuffer = req.file?.buffer;
      const imageName = req.file?.originalname;

      if (!imageBuffer || !imageName) {
        throw new AppError("A imagem do usuário é obrigatória", 400);
      }

      if (!name || !email || !password || !confirmPassword) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "As senhas não coincidem" });
      }

      const createUserService = new CreateUserServices();
      const result = await createUserService.execute({
        name: name,
        email: email,
        password: password,
        imageBuffer,
        imageName,
      });

      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export { CreateUserController };
