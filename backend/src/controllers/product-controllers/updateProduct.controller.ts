import { UpdateProductService } from "@/services/product-services/updateProduct.service";
import { AppError } from "@/shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

class UpdateProductController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { category_id, description, disabled, name, price } = req.body;
      const imageBuffer = req.file?.buffer;
      const imageName = req.file?.originalname;

      if (
        !imageBuffer &&
        !imageName &&
        Object.keys(req.body).length === 0
      ) {
        throw new AppError("Informe ao menos um campo para atualizar", 400);
      }

      const result = await new UpdateProductService().execute({
        id: req.params.id as string,
        imageBuffer,
        imageName,
        category_id,
        description,
        disabled,
        name,
        price,
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}

export { UpdateProductController };
