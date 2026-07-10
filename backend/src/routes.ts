import { Request, Response, Router } from "express";
import { userRouter } from "./routes/users.routes";
import { categoryRouter } from "./routes/category.routes";
import { productRouter } from "./routes/product.routes";

const router = Router();

router.get("/api", (_req: Request, res: Response) => {
  res.json({ message: "Bem-vindo à API da pizzaria!" });
});

router.use("/api", userRouter);
router.use("/api", categoryRouter);
router.use("/api", productRouter);

export { router };
