import { ListProductsService } from "@/services/product-services/listProducts.service";
import { NextFunction, Request, Response } from "express";

class ListProductsController {
  async handle(_req: Request, res: Response, next: NextFunction) {
    try {
      const listProductsService = new ListProductsService();
      const products = await listProductsService.execute();

      return res.status(200).json(products);
    } catch (error) {
      return next(error);
    }
  }
}

export { ListProductsController };
