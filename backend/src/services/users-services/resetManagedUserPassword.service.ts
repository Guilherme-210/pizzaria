import prisma from "@/lib/prisma";
import { AppError, HttpStatus } from "@/shared/errors/AppError";
import { hash } from "bcryptjs";

class ResetManagedUserPasswordService {
  async execute(userId: string) {
    const defaultPassword = process.env.DEFAULT_USER_PASSWORD;

    if (!defaultPassword || defaultPassword.length < 6) {
      throw new AppError(
        "A senha padrão de usuários não está configurada",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new AppError("Usuário não encontrado", HttpStatus.NOT_FOUND);
    }

    await prisma.user.update({
      where: { id: userId },
      data: { password: await hash(defaultPassword, 10) },
    });

    return { message: "Senha redefinida para a senha padrão" };
  }
}

export { ResetManagedUserPasswordService };
