import { GetUserService } from "@/services/users-services/getUser.service";
import { NextFunction, Request, Response } from "express";

class GetUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = req.user_id as string;

      const getUserService = new GetUserService();
      const user = await getUserService.execute(user_id);

      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }
}

export { GetUserController };
