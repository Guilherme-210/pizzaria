import { Request, Response } from 'express';
import { AuthUserService } from '@/services/users-services/authUser.service';

class AuthUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
            const authUserService = new AuthUserService();
            const result = await authUserService.execute(email, password);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }
}

export { AuthUserController };
