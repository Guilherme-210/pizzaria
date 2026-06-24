import { Request, Response, Router } from "express";

import { CreateUserController } from "@/controllers/users-controllers/createUser.controller";
import { authUserSchema, createUserSchema } from "@/schemas/user.schemas";
import { validateSchema } from "@/shared/middlewares/valedate.schemas";
import { AuthUserController } from "@/controllers/users-controllers/authUser.controller";

const userRouter = Router();

userRouter.get("/users", (_req: Request, res: Response) => {
  // Lógica para obter a lista de usuários
  res.json({ message: "Lista de usuários" });
});

userRouter.get("/users/:id", (req: Request, res: Response) => {
  const userId = req.params.id;
  // Lógica para obter um usuário específico
  res.json({ message: `Detalhes do usuário ${userId}` });
});

userRouter.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle,
);

userRouter.post(
  "/users/session",
  validateSchema(authUserSchema),
  new AuthUserController().handle
);

userRouter.put("/users/:id", (req: Request, res: Response) => {
  const userId = req.params.id;
  // Lógica para atualizar um usuário específico
  res.json({ message: `Usuário ${userId} atualizado` });
});

userRouter.patch("/users/:id", (req: Request, res: Response) => {
  const userId = req.params.id;
  // Lógica para atualizar parcialmente um usuário específico
  res.json({ message: `Usuário ${userId} atualizado parcialmente` });
});

export { userRouter };
