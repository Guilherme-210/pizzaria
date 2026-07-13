import prisma from "@/lib/prisma";
import { AppError, HttpStatus } from "@/shared/errors/AppError";
import { uploadImage } from "@/utils/uploadImage";

interface UpdateProductRequest {
  id: string;
  name?: string;
  price?: number;
  description?: string;
  imageBuffer?: Buffer;
  imageName?: string;
  category_id?: string;
  disabled?: boolean;
}

class UpdateProductService {
  async execute({
    id,
    category_id,
    imageName,
    imageBuffer,
    name,
    price,
    description,
    disabled,
  }: UpdateProductRequest) {
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

    let bannerUrl: string | undefined;

    if (imageBuffer && imageName) {
      try {
        const result = await uploadImage({
          imageBuffer,
          folder: "products",
          publicId: `${id}-${imageName.split(".")[0]}-${Date.now()}`,
        });

        bannerUrl = result.secure_url;
      } catch {
        throw new AppError(
          "Erro ao enviar a imagem do produto",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        description,
        banner: bannerUrl ?? product.banner,
        category_id,
        disabled,
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
