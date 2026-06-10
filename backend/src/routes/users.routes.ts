import { Router, Request, Response } from "express";
import { validateSchema } from "@middlewares";

import { CreateUserController } from "@controllers";

import { createUserSchema } from "@/schemas";

const userRouter = Router();

userRouter.post('/users', validateSchema(createUserSchema), new CreateUserController().handle);

// userRouter.get('/users', (_req: Request, res: Response) => {
//     res.json({ message: 'Lista de usuários' });
// });

// userRouter.get('/users/:id', (req: Request, res: Response) => {
//     const userId = req.params.id;
//     res.json({ message: `Detalhes do usuário ${userId}` });
// });

// userRouter.post('/users/session', (_req: Request, res: Response) => {
//     res.json({ message: 'Usuário autenticado' });
// });

// userRouter.put('/users/:id', (req: Request, res: Response) => {
//     const userId = req.params.id;
//     res.json({ message: `Usuário ${userId} atualizado` });
// });

// userRouter.patch('/users/:id', (req: Request, res: Response) => {
//     const userId = req.params.id;
//     res.json({ message: `Usuário ${userId} atualizado parcialmente` });
// });

export { userRouter };