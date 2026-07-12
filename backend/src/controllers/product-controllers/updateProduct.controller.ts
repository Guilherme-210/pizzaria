import { UpdateProductService } from "@/services/product-services/updateProduct.service";
import { NextFunction, Request, Response } from "express";

class UpdateProductController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await new UpdateProductService().execute({
        id: req.params.id as string,
        ...req.body,
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export { UpdateProductController };
