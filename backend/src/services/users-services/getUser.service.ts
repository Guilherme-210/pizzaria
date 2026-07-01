import prisma from "@/lib/prisma";
import { AppError } from "@/shared/errors/AppError";

class GetUserService {
  async execute(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return user;
  }
}

export { GetUserService };
