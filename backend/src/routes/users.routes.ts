import { AuthUserController } from "@/controllers/users-controllers/authUser.controller";
import { CreateUserController } from "@/controllers/users-controllers/createUser.controller";
import { DeleteUserController } from "@/controllers/users-controllers/deleteUser.controller";
import { GetUserController } from "@/controllers/users-controllers/getUser.controller";
import { ListUsersController } from "@/controllers/users-controllers/listUsers.controller";
import { UpdateUserController } from "@/controllers/users-controllers/updateUser.controller";
import { UpdateManagedUserController } from "@/controllers/users-controllers/updateManagedUser.controller";
import { ResetManagedUserPasswordController } from "@/controllers/users-controllers/resetManagedUserPassword.controller";
import {
  authUserSchema,
  createUserSchema,
  updateManagedUserSchema,
  updateUserSchema,
  userIdSchema,
} from "@/schemas/user.schemas";
import { authorizeRoles } from "@/shared/middlewares/authorizeRoles.middleware";
import { isAuthenticated } from "@/shared/middlewares/isAutentecated.middleware";
import { validateSchema } from "@/shared/middlewares/valedate.schemas";
import { Router } from "express";

const userRouter = Router();

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const listUsersController = new ListUsersController();
const getUserController = new GetUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const updateManagedUserController = new UpdateManagedUserController();
const resetManagedUserPasswordController =
  new ResetManagedUserPasswordController();

userRouter.post(
  "/users",
  validateSchema(createUserSchema),
  createUserController.handle,
);

userRouter.post(
  "/user/session",
  validateSchema(authUserSchema),
  authUserController.handle,
);

userRouter.post(
  "/users/session",
  validateSchema(authUserSchema),
  authUserController.handle,
);

userRouter.get(
  "/users",
  isAuthenticated,
  authorizeRoles("ADMIN", "SUPER_ADMIN"),
  listUsersController.handle,
);

userRouter.get("/me", isAuthenticated, getUserController.handle);

userRouter.put(
  "/user",
  isAuthenticated,
  validateSchema(updateUserSchema),
  updateUserController.handle,
);

userRouter.patch(
  "/user",
  isAuthenticated,
  validateSchema(updateUserSchema),
  updateUserController.handle,
);

userRouter.patch(
  "/management/users/:id",
  isAuthenticated,
  authorizeRoles("ADMIN", "SUPER_ADMIN"),
  validateSchema(updateManagedUserSchema),
  updateManagedUserController.handle,
);

userRouter.patch(
  "/management/users/:id/reset-password",
  isAuthenticated,
  authorizeRoles("ADMIN", "SUPER_ADMIN"),
  validateSchema(userIdSchema),
  resetManagedUserPasswordController.handle,
);

userRouter.delete(
  "/user",
  isAuthenticated,
  authorizeRoles("ADMIN", "SUPER_ADMIN"),
  deleteUserController.handle,
);

export { userRouter };
