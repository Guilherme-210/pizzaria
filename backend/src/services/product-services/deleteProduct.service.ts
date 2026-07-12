import prisma from "@/lib/prisma";
import { AppError, HttpStatus } from "@/shared/errors/AppError";

class DeleteProductService {
  async execute(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new AppError("Produto não encontrado", HttpStatus.NOT_FOUND);
    }

    await prisma.product.update({
      where: { id },
      data: { disabled: true },
    });

    return { message: "Produto desativado com sucesso" };
  }
}

export { DeleteProductService };
