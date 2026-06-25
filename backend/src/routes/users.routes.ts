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
import { validateSchema } from "@/shared/middlewares/valedate.schemas";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/users", new ListUsersController().handle);

userRouter.get("/users/:id", new GetUserController().handle);

userRouter.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle,
);

userRouter.post(
  "/users/session",
  validateSchema(authUserSchema),
  new AuthUserController().handle,
);

userRouter.put(
  "/users/:id",
  validateSchema(updateUserSchema),
  new UpdateUserController().handle,
);

userRouter.patch(
  "/users/:id",
  validateSchema(updateUserSchema),
  new UpdateUserController().handle,
);

userRouter.delete("/users/:id", new DeleteUserController().handle);

export { userRouter };
