import { z } from "zod";
import { Role } from "@/generated/prisma/enums";

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
    confirmPassword: z
      .string({ message: "A confirmação de senha é obrigatória" })
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
  })
    .superRefine((data, ctx) => {
      // Se password foi enviada, confirmPassword é obrigatória
      if (data.password && !data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["confirmPassword"],
          message: "A confirmação de senha é obrigatória",
        });
      }

      // Se ambas existem, elas devem ser iguais
      if (
        data.password &&
        data.confirmPassword &&
        data.password !== data.confirmPassword
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["confirmPassword"],
          message: "As senhas não coincidem",
        });
      }
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
        .string({ message: "O e-mail é obrigatório" })
        .email({ message: "O e-mail é inválido" })
        .optional(),
      password: z
        .string({ message: "A senha deve ter no mínimo 6 caracteres" })
        .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
        .optional(),
      confirmPassword: z
        .string({ message: "A senha deve ter no mínimo 6 caracteres" })
        .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
        .optional(),
    })
    .superRefine((data, ctx) => {
      // Se password foi enviada, confirmPassword é obrigatória
      if (data.password && !data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["confirmPassword"],
          message: "A confirmação de senha é obrigatória",
        });
      }

      // Se ambas existem, elas devem ser iguais
      if (
        data.password &&
        data.confirmPassword &&
        data.password !== data.confirmPassword
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["confirmPassword"],
          message: "As senhas não coincidem",
        });
      }
    }),
});

export const userIdSchema = z.object({
  params: z.object({
    id: z.uuid({ message: "O ID do usuário é inválido" }),
  }),
});

export const updateManagedUserSchema = z.object({
  params: z.object({
    id: z.uuid({ message: "O ID do usuário é inválido" }),
  }),
  body: z
    .object({
      name: z
        .string({ message: "O nome é obrigatório" })
        .min(1, { message: "O nome é obrigatório" })
        .optional(),
      email: z
        .string({ message: "O e-mail é obrigatório" })
        .email({ message: "O e-mail é inválido" })
        .optional(),
      active: z
        .preprocess(
          (value) => {
            if (value === "true") return true;
            if (value === "false") return false;
            return value;
          },
          z.boolean({
            message: "O status do usuário deve ser verdadeiro ou falso",
          }),
        )
        .optional(),
      role: z.nativeEnum(Role).optional(),
    }),
});
