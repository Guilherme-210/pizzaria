import prisma from "@/lib/prisma";
import { AppError, HttpStatus } from "@/shared/errors/AppError";
import { uploadImage } from "@/utils/uploadImage";

interface CreateProductRequest {
  name: string;
  price: number;
  description: string;
  category_id: string;
  imageBuffer: Buffer;
  imageName: string;
}

class CreateProductService {
  async execute({
    name,
    price,
    description,
    category_id,
    imageBuffer,
    imageName,
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

    let bannerUrl: string;

    try {
      const result = await uploadImage({
        imageBuffer,
        folder: "products",
        publicId: `${category_id}-${imageName.split(".")[0]}-${Date.now()}`,
      });

      bannerUrl = result.secure_url;
    } catch {
      throw new AppError(
        "Erro ao enviar a imagem do produto",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        banner: bannerUrl,
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
