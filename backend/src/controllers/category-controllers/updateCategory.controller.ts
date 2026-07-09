import { UpdateCategoryService } from "@/services/category-services/updateCategory.service";
import { NextFunction, Request, Response } from "express";

class UpdateCategoryController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const { name } = req.body;

      const updateCategoryService = new UpdateCategoryService();
      const result = await updateCategoryService.execute({ id, name });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export { UpdateCategoryController };
