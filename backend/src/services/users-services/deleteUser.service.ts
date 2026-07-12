import prisma from "@/lib/prisma";
import { AppError } from "@/shared/errors/AppError";

class DeleteUserService {
  async execute(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    await prisma.user.update({
      where: { id: userId },
      data: { active: false },
    });

    return { message: "Usuário desativado com sucesso" };
  }
}

export { DeleteUserService };
