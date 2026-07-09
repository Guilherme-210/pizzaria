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

    await prisma.category.delete({
      where: { id },
    });

    return { message: "Categoria removida com sucesso" };
  }
}

export { DeleteCategoryService };
