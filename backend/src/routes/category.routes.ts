import { CreateCategoryController } from "@/controllers/category-controllers/createCategory.controller";
import { createCategorySchema } from "@/schemas/category.schemas";
import { authorizeRoles } from "@/shared/middlewares/authorizeRoles.middleware";

import { isAuthenticated } from "@/shared/middlewares/isAutentecated.middleware";
import { validateSchema } from "@/shared/middlewares/valedate.schemas";
import { Router } from "express";

const categoryRouter = Router();

const createCategoryController = new CreateCategoryController();

categoryRouter.post(
  "/category",
  isAuthenticated,
  authorizeRoles("KITCHEN", "MANAGER", "ADMIN", "SUPER_ADMIN"),
  validateSchema(createCategorySchema),
  createCategoryController.handle,
);

export { categoryRouter };
