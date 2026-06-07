import { Router, Request, Response } from "express";

const userRouter = Router();

userRouter.get('/users', (_req: Request, res: Response) => {
    // Lógica para obter a lista de usuários
    res.json({ message: 'Lista de usuários' });
});

userRouter.get('/users/:id', (req: Request, res: Response) => {
    const userId = req.params.id;
    // Lógica para obter um usuário específico
    res.json({ message: `Detalhes do usuário ${userId}` });
});

userRouter.post('/users', (_req: Request, res: Response) => {
    // Lógica para criar um novo usuário
    res.json({ message: 'Usuário criado' });
});

userRouter.post('/users/session', (_req: Request, res: Response) => {
    // Lógica para autenticar o usuário
    res.json({ message: 'Usuário autenticado' });
});

userRouter.put('/users/:id', (req: Request, res: Response) => {
    const userId = req.params.id;
    // Lógica para atualizar um usuário específico
    res.json({ message: `Usuário ${userId} atualizado` });
});

userRouter.patch('/users/:id', (req: Request, res: Response) => {
    const userId = req.params.id;
    // Lógica para atualizar parcialmente um usuário específico
    res.json({ message: `Usuário ${userId} atualizado parcialmente` });
});

export { userRouter };