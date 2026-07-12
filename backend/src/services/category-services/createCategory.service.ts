import prisma from "@/lib/prisma";
import { AppError } from "@/shared/errors/AppError";

class CreateCategoryService {
  async execute(name: string) {
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    if (existingCategory) {
      throw new AppError("Categoria já existe", 409);
    }

    const category = await prisma.category.create({
      data: { name },
      select: {
        id: true,
        name: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return category;
  }
}

export { CreateCategoryService };
