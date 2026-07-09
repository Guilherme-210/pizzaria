import prisma from "@/lib/prisma";
import { AppError } from "@/shared/errors/AppError";

class GetCategoryService {
  async execute(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            description: true,
            banner: true,
            disabled: true,
            createdAt: true,
            updatedAt: true,
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!category) {
      throw new AppError("Categoria não encontrada", 404);
    }

    return category;
  }
}

export { GetCategoryService };
