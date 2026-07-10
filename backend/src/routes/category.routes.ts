import { CreateCategoryController } from "@/controllers/category-controllers/createCategory.controller";
import { DeleteCategoryController } from "@/controllers/category-controllers/deleteCategory.controller";
import { GetCategoryController } from "@/controllers/category-controllers/getCategory.controller";
import { ListCategoriesController } from "@/controllers/category-controllers/listCategories.controller";
import { UpdateCategoryController } from "@/controllers/category-controllers/updateCategory.controller";
import {
  categoryIdSchema,
  createCategorySchema,
  updateCategorySchema,
} from "@/schemas/category.schemas";
import { authorizeRoles } from "@/shared/middlewares/authorizeRoles.middleware";

import { isAuthenticated } from "@/shared/middlewares/isAutentecated.middleware";
import { validateSchema } from "@/shared/middlewares/valedate.schemas";
import { Router } from "express";

const categoryRouter = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const getCategoryController = new GetCategoryController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

const categoryManagementRoles = authorizeRoles(
  "KITCHEN",
  "MANAGER",
  "ADMIN",
  "SUPER_ADMIN",
);

categoryRouter.post(
  "/category",
  // isAuthenticated,
  // categoryManagementRoles,
  // validateSchema(createCategorySchema),
  createCategoryController.handle,
);

categoryRouter.get(
  "/categories",
  // isAuthenticated,
  listCategoriesController.handle,
);

categoryRouter.get(
  "/category/:id",
  // isAuthenticated,
  // validateSchema(categoryIdSchema),
  getCategoryController.handle,
);

categoryRouter.put(
  "/category/:id",
  // isAuthenticated,
  // categoryManagementRoles,
  // validateSchema(updateCategorySchema),
  updateCategoryController.handle,
);

categoryRouter.patch(
  "/category/:id",
  // isAuthenticated,
  // categoryManagementRoles,
  // validateSchema(updateCategorySchema),
  updateCategoryController.handle,
);

categoryRouter.delete(
  "/category/:id",
  // isAuthenticated,
  authorizeRoles("ADMIN", "SUPER_ADMIN"),
  // validateSchema(categoryIdSchema),
  deleteCategoryController.handle,
);

export { categoryRouter };
