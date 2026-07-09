import prisma from "@/lib/prisma";

class ListCategoriesService {
  async execute() {
    return prisma.category.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  }
}

export { ListCategoriesService };
