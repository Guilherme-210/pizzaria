import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ message: "O nome da categoria é obrigatório" })
      .trim()
      .min(2, {
        message: "O nome da categoria deve ter no mínimo 2 caracteres",
      }),
  }),
});

export const categoryIdSchema = z.object({
  params: z.object({
    id: z.uuid({ message: "O ID da categoria é inválido" }),
  }),
});

export const updateCategorySchema = z.object({
  params: z.object({
    id: z.uuid({ message: "O ID da categoria é inválido" }),
  }),
  body: z.object({
    name: z
      .string({ message: "O nome da categoria é obrigatório" })
      .trim()
      .min(2, {
        message: "O nome da categoria deve ter no mínimo 2 caracteres",
      }),
  }),
});
