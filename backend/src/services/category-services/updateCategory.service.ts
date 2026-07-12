import prisma from "@/lib/prisma";
import { AppError } from "@/shared/errors/AppError";

interface UpdateCategoryProps {
  id: string;
  name?: string;
  active?: boolean;
}

class UpdateCategoryService {
  async execute({ id, name, active }: UpdateCategoryProps) {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new AppError("Categoria não encontrada", 404);
    }

    const categoryWithSameName = name
      ? await prisma.category.findFirst({
          where: {
            id: { not: id },
            name: {
              equals: name,
              mode: "insensitive",
            },
          },
        })
      : null;

    if (categoryWithSameName) {
      throw new AppError("Categoria já existe", 409);
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(active !== undefined && { active }),
      },
      select: {
        id: true,
        name: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      message: "Categoria atualizada com sucesso",
      category: updatedCategory,
    };
  }
}

export { UpdateCategoryService };
