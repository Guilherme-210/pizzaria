import prisma from "@/lib/prisma";

class ListUsersService {
  async execute() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users;
  }
}

export { ListUsersService };
