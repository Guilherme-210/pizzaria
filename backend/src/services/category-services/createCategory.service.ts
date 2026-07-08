import prisma from "@/lib/prisma";
import { AppError } from "@/shared/errors/AppError";

interface CreateCategoryProps {
  name: string;
}

class CreateCategoryService {
  async execute(name: string) {
    try {
      //   const existingCategory = await prisma.category.findUnique({
      //     where: {
      //       name: categoryName,
      //     },
      //   });

      //   if (existingCategory) {
      //     throw new AppError("Categoria já existe", 400);
      //   }

      const category = await prisma.category.create({
        data: { name: name },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      });

      return category;
    } catch (error) {
      throw new AppError(`Erro ao criar categoria: ${error}`, 500);
    }
  }
}

export { CreateCategoryService };
