import { Router, Request, Response } from "express";
import { userRouter } from "./routes/users.routes";

const router = Router();

router.get('/api/', (_req: Request, res: Response) => {
    res.json({ message: 'Bem-vindo à API da pizzaria!' });
});

router.use('/api', userRouter);

export { router };