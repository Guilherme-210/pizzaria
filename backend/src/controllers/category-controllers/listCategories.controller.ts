import { ListCategoriesService } from "@/services/category-services/listCategories.service";
import { NextFunction, Request, Response } from "express";

class ListCategoriesController {
  async handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const listCategoriesService = new ListCategoriesService();
      const categories = await listCategoriesService.execute();

      return res.status(200).json(categories);
    } catch (error) {
      return next(error);
    }
  }
}

export { ListCategoriesController };
