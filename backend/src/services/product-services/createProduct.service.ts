import prisma from "@/lib/prisma";
import { AppError, HttpStatus } from "@/shared/errors/AppError";

interface CreateProductRequest {
  name: string;
  price: number;
  description: string;
  banner: string;
  category_id: string;
}

class CreateProductService {
  async execute({
    name,
    price,
    description,
    banner,
    category_id,
  }: CreateProductRequest) {
    const category = await prisma.category.findUnique({
      where: { id: category_id },
      select: { id: true, active: true },
    });

    if (!category) {
      throw new AppError("Categoria não encontrada", HttpStatus.NOT_FOUND);
    }

    if (!category.active) {
      throw new AppError("Categoria está desativada", HttpStatus.BAD_REQUEST);
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        banner,
        category_id,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        banner: true,
        disabled: true,
        category_id: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return product;
  }
}

export { CreateProductService };
