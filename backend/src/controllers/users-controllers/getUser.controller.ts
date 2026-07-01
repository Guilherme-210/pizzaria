import { GetUserService } from "@/services/users-services/getUser.service";
import { NextFunction, Request, Response } from "express";

class GetUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId as string;

      const getUserService = new GetUserService();
      const user = await getUserService.execute(userId);

      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }
}

export { GetUserController };
