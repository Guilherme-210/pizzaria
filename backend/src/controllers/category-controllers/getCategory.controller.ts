import { GetCategoryService } from "@/services/category-services/getCategory.service";
import { NextFunction, Request, Response } from "express";

class GetCategoryController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const getCategoryService = new GetCategoryService();
      const category = await getCategoryService.execute(id as string);

      return res.status(200).json(category);
    } catch (error) {
      return next(error);
    }
  }
}

export { GetCategoryController };
