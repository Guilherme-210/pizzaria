import { CreateUserServices } from "@/services/users-services/createUser.service";
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
      });

      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export { CreateUserController };
