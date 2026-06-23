import { CreateUserServices } from "@/services/users-services/createUser.service";
import { NextFunction, Request, Response } from "express";

interface ICreateUserController {
  name: string;
  email: string;
  password: string;
}

class CreateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body as ICreateUserController;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }

      const createUserService = new CreateUserServices();
      const result = await createUserService.execute({
        name: name,
        email: email,
        password: password,
      });

      return res.status(201).json(result)
    } catch (error) {
      return next(error);
    }
  }
}

export { CreateUserController };
