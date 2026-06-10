import { z } from "zod";

const createUserSchema = z.object({
    body: z.object({
        name: z
            .string({ message: "O nome é obrigatório" })
            .min(3, { message: "O nome deve conter no mínimo 3 caracteres" }),
        email: z
            .string({ message: "O email é obrigatório" })
            .email({ message: "Precisa ser um email válido" }),
        password: z
            .string({ message: "A senha é obrigatória" })
            .min(6, { message: "A senha deve conter no mínimo 6 caracteres" }),
        age: z
            .number({ message: "A idade é obrigatória" })
            .int({ message: "A idade deve ser um número inteiro" })
            .positive({ message: "A idade deve ser um número positivo" }),
    }),
});

export { createUserSchema };