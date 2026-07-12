import prisma from "@/lib/prisma";
import { AppError } from "@/shared/errors/AppError";

class DeleteCategoryService {
  async execute(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new AppError("Categoria não encontrada", 404);
    }

    await prisma.category.update({
      where: { id },
      data: { active: false },
    });

    return { message: "Categoria desativada com sucesso" };
  }
}

export { DeleteCategoryService };
