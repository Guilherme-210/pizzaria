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

export const productIdSchema = z.object({
  params: z.object({
    id: z.uuid({ message: "O ID do produto é inválido" }),
  }),
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.uuid({ message: "O ID do produto é inválido" }),
  }),
  body: z
    .object({
      name: z
        .string({ message: "O nome do produto deve ser um texto" })
        .trim()
        .min(2, {
          message: "O nome do produto deve ter no mínimo 2 caracteres",
        })
        .optional(),
      price: z
        .number({ message: "O preço do produto deve ser um número" })
        .int({
          message: "O preço do produto deve ser um número inteiro em centavos",
        })
        .positive({ message: "O preço do produto deve ser maior que zero" })
        .optional(),
      description: z
        .string({ message: "A descrição do produto deve ser um texto" })
        .trim()
        .min(2, {
          message: "A descrição do produto deve ter no mínimo 2 caracteres",
        })
        .optional(),
      banner: z
        .string({ message: "O banner do produto deve ser um texto" })
        .trim()
        .min(1, { message: "O banner do produto não pode estar vazio" })
        .optional(),
      category_id: z
        .string({ message: "A categoria do produto deve ser um texto" })
        .trim()
        .uuid({ message: "A categoria do produto deve ser um UUID válido" })
        .optional(),
      disabled: z.boolean({
        message: "O status do produto deve ser verdadeiro ou falso",
      }).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "Informe ao menos um campo para atualizar",
    }),
});
