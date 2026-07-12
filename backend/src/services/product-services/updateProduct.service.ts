import prisma from "@/lib/prisma";
import { AppError, HttpStatus } from "@/shared/errors/AppError";

interface UpdateProductRequest {
  id: string;
  name?: string;
  price?: number;
  description?: string;
  banner?: string;
  category_id?: string;
  disabled?: boolean;
}

class UpdateProductService {
  async execute({ id, category_id, ...data }: UpdateProductRequest) {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new AppError("Produto não encontrado", HttpStatus.NOT_FOUND);
    }

    if (category_id) {
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
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        ...(category_id !== undefined && { category_id }),
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

    return {
      message: "Produto atualizado com sucesso",
      product: updatedProduct,
    };
  }
}

export { UpdateProductService };
