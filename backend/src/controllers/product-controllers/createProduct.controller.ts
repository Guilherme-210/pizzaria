import { NextFunction, Request, Response } from "express";
import { CreateProductService } from "@/services/product-services/createProduct.service";
import { AppError } from "@/shared/errors/AppError";

class CreateProductController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { category_id, description, name, price } = req.body;
      const imageBuffer = req.file?.buffer;
      const imageName = req.file?.originalname;

      if (!imageBuffer || !imageName) {
        throw new AppError("A imagem do produto é obrigatória", 400);
      }

      const createProductService = new CreateProductService();

      const product = await createProductService.execute({
        name,
        category_id,
        description,
        imageBuffer,
        imageName,
        price,
      });

      return res.status(201).json(product);
    } catch (error) {
      return next(error);
    }
  }
}

export { CreateProductController };
