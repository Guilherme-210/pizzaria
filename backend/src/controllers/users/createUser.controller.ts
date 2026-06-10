import { Request, Response } from 'express';
import { CreateUserService } from '@services';

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password, age, role } = req.body;

        const service = new CreateUserService();
        const result = await service.execute({ name, email, password, age, role });

        res.json(result);
    }
}

export { CreateUserController };