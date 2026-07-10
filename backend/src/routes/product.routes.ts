import { CreateProductController } from "@/controllers/product-controllers/createProduct.controller";
import { ListProductsController } from "@/controllers/product-controllers/listProducts.controller";
import { createProductSchema } from "@/schemas/product.schemas";
import { validateSchema } from "@/shared/middlewares/valedate.schemas";
import { Router } from "express";

const productRouter = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();

productRouter.get("/products", listProductsController.handle);

productRouter.post(
  "/product",
  // validateSchema(createProductSchema),
  createProductController.handle,
);

export { productRouter };
