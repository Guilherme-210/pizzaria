import "dotenv/config";

import { errorMiddleware } from "@shared/middlewares/error.middleware";
import cors from "cors";
import express from "express";
import { router } from "./routes";

const PORT = process.env.PORT! || 3333;

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`🚀 O servidor está rodando na porta: ${PORT}`);
});
