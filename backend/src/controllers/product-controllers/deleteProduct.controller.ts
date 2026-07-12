import { DeleteProductService } from "@/services/product-services/deleteProduct.service";
import { NextFunction, Request, Response } from "express";

class DeleteProductController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await new DeleteProductService().execute(
        req.params.id as string,
      );

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export { DeleteProductController };
