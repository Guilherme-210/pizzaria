import { DeleteCategoryService } from "@/services/category-services/deleteCategory.service";
import { NextFunction, Request, Response } from "express";

class DeleteCategoryController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;

      const deleteCategoryService = new DeleteCategoryService();
      const result = await deleteCategoryService.execute(id);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export { DeleteCategoryController };
