import prisma from "@/lib/prisma";
import { AppError } from "@/shared/errors/AppError";

class DeleteUserService {
  async execute(user_id: string) {
    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    await prisma.user.delete({
      where: { id: user_id },
    });

    return { message: "Usuário removido com sucesso" };
  }
}

export { DeleteUserService };
