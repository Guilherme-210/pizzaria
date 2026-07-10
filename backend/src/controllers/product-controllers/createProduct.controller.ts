import { NextFunction, Request, Response } from "express";
import { CreateProductService } from "@/services/product-services/createProduct.service";

class CreateProductController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, description, banner, category_id } = req.body;

      const createProductService = new CreateProductService();

      const product = await createProductService.execute({
        name,
        price,
        description,
        banner,
        category_id,
      });

      return res.status(201).json(product);
    } catch (error) {
      return next(error);
    }
  }
}

export { CreateProductController };
