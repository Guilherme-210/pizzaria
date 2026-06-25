import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "O nome é obrigatório" })
      .min(1, { message: "O nome é obrigatório" }),
    email: z
      .string({ message: "O e-mail é obrigatório" })
      .email({ message: "O e-mail é inválido" }),
    password: z
      .string({ message: "A senha é obrigatória" })
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
  }),
});

export const authUserSchema = z.object({
  body: z.object({
    email: z
      .string({ message: "O e-mail é obrigatório" })
      .email({ message: "O e-mail é inválido" }),
    password: z
      .string({ message: "A senha é obrigatória" })
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
  }),
});

export const updateUserSchema = z.object({
  body: z
    .object({
      name: z
        .string({ message: "O nome é obrigatório" })
        .min(1, { message: "O nome é obrigatório" })
        .optional(),
      email: z
        .string({ message: "O e-mail é inválido" })
        .email({ message: "O e-mail é inválido" })
        .optional(),
      password: z
        .string({ message: "A senha deve ter no mínimo 6 caracteres" })
        .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "Pelo menos um campo deve ser enviado",
    }),
});
