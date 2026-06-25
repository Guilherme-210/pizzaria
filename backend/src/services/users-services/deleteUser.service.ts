import prisma from "@/lib/prisma";
import { AppError } from "@/shared/errors/AppError";

class DeleteUserService {
  async execute(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    await prisma.user.delete({
      where: { id },
    });

    return { message: "Usuário removido com sucesso" };
  }
}

export { DeleteUserService };
