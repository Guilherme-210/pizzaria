import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ message: "O nome da categoria é obrigatório" })
      .min(2, {
        message: "O nome da categoria deve ter no mínimo 2 caracteres",
      }),
  }),
});
