import { ResetManagedUserPasswordService } from "@/services/users-services/resetManagedUserPassword.service";
import { NextFunction, Request, Response } from "express";

class ResetManagedUserPasswordController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await new ResetManagedUserPasswordService().execute(
        req.params.id as string,
      );

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export { ResetManagedUserPasswordController };
