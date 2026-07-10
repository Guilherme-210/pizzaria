import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "O nome do produto é obrigatório" })
      .trim()
      .min(2, {
        message: "O nome do produto deve ter no mínimo 2 caracteres",
      }),
    price: z
      .number({ message: "O preço do produto é obrigatório" })
      .int({
        message: "O preço do produto deve ser um número inteiro em centavos",
      })
      .positive({ message: "O preço do produto deve ser maior que zero" }),
    description: z
      .string({ message: "A descrição do produto é obrigatória" })
      .trim()
      .min(2, {
        message: "A descrição do produto deve ter no mínimo 2 caracteres",
      }),
    banner: z
      .string({ message: "O banner do produto é obrigatório" })
      .trim()
      .min(1, {
        message: "O banner do produto é obrigatório",
      }),
    category_id: z
      .string({ message: "A categoria do produto é obrigatória" })
      .trim()
      .uuid({ message: "A categoria do produto deve ser um UUID válido" }),
  }),
});
