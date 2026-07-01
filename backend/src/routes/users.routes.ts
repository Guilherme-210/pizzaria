import { AuthUserController } from "@/controllers/users-controllers/authUser.controller";
import { CreateUserController } from "@/controllers/users-controllers/createUser.controller";
import { DeleteUserController } from "@/controllers/users-controllers/deleteUser.controller";
import { GetUserController } from "@/controllers/users-controllers/getUser.controller";
import { ListUsersController } from "@/controllers/users-controllers/listUsers.controller";
import { UpdateUserController } from "@/controllers/users-controllers/updateUser.controller";
import {
  authUserSchema,
  createUserSchema,
  updateUserSchema,
} from "@/schemas/user.schemas";
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

userRouter.post(
  "/users",
  validateSchema(createUserSchema),
  createUserController.handle,
);

userRouter.post(
  "/users/session",
  validateSchema(authUserSchema),
  authUserController.handle,
);

userRouter.get("/users", isAuthenticated, listUsersController.handle);

userRouter.get(
  "/users/:userId",
  isAuthenticated,
  getUserController.handle,
);

userRouter.put(
  "/users/:userId",
  isAuthenticated,
  validateSchema(updateUserSchema),
  updateUserController.handle,
);

userRouter.patch(
  "/users/:userId",
  isAuthenticated,
  validateSchema(updateUserSchema),
  updateUserController.handle,
);

userRouter.delete(
  "/users/:userId",
  isAuthenticated,
  deleteUserController.handle,
);

export { userRouter };

