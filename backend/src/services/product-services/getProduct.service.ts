import prisma from "@/lib/prisma";
import { AppError, HttpStatus } from "@/shared/errors/AppError";

class GetProductService {
  async execute(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        banner: true,
        disabled: true,
        category_id: true,
        category: {
          select: {
            id: true,
            name: true,
            active: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!product) {
      throw new AppError("Produto não encontrado", HttpStatus.NOT_FOUND);
    }

    return product;
  }
}

export { GetProductService };
