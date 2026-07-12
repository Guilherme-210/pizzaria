import { CreateProductController } from "@/controllers/product-controllers/createProduct.controller";
import { DeleteProductController } from "@/controllers/product-controllers/deleteProduct.controller";
import { GetProductController } from "@/controllers/product-controllers/getProduct.controller";
import { ListProductsController } from "@/controllers/product-controllers/listProducts.controller";
import { UpdateProductController } from "@/controllers/product-controllers/updateProduct.controller";
import {
  createProductSchema,
  productIdSchema,
  updateProductSchema,
} from "@/schemas/product.schemas";
import { authorizeRoles } from "@/shared/middlewares/authorizeRoles.middleware";
import { isAuthenticated } from "@/shared/middlewares/isAutentecated.middleware";
import { validateSchema } from "@/shared/middlewares/valedate.schemas";
import { Router } from "express";

const productRouter = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const getProductController = new GetProductController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();

const productManagementRoles = authorizeRoles(
  "KITCHEN",
  "MANAGER",
  "ADMIN",
  "SUPER_ADMIN",
);

productRouter.get("/products", isAuthenticated, listProductsController.handle);

productRouter.get(
  "/product/:id",
  isAuthenticated,
  validateSchema(productIdSchema),
  getProductController.handle,
);

productRouter.post(
  "/product",
  isAuthenticated,
  productManagementRoles,
  validateSchema(createProductSchema),
  createProductController.handle,
);

productRouter.put(
  "/product/:id",
  isAuthenticated,
  productManagementRoles,
  validateSchema(updateProductSchema),
  updateProductController.handle,
);

productRouter.patch(
  "/product/:id",
  isAuthenticated,
  productManagementRoles,
  validateSchema(updateProductSchema),
  updateProductController.handle,
);

productRouter.delete(
  "/product/:id",
  isAuthenticated,
  authorizeRoles("ADMIN", "SUPER_ADMIN"),
  validateSchema(productIdSchema),
  deleteProductController.handle,
);

export { productRouter };
