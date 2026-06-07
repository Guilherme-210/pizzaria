import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT! || 3333;

app.use(router);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
});

app.listen(PORT, () => {
    console.log(`🚀 O servidor está rodando na porta: ${PORT}`);
});
