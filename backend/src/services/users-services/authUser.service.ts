import { AppError } from "@errors/AppError";
import prisma from "@lib/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import type { Role } from "@/generated/prisma/enums";

class AuthUserService {
  async execute(
    email: string,
    password: string,
  ): Promise<{
    token: string;
    name: string;
    email: string;
    role: Role;
  }> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Verifica se o usuário existe no banco de dados
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Senha incorreta", 401);
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET! as string,
      {
        subject: `${user.id}`,
        expiresIn: "1d",
      },
    );

    return {
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
  }
}

export { AuthUserService };
