import { GetProductService } from "@/services/product-services/getProduct.service";
import { NextFunction, Request, Response } from "express";

class GetProductController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await new GetProductService().execute(req.params.id as string);

      return res.status(200).json(product);
    } catch (error) {
      return next(error);
    }
  }
}

export { GetProductController };
