import prisma from "@/lib/prisma";

class ListProductsService {
  async execute() {
    return prisma.product.findMany({
      where: {
        disabled: false,
        category: { active: true },
      },
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
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }
}

export { ListProductsService };
