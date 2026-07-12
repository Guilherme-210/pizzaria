import prisma from "@/lib/prisma";
import { AppError } from "@/shared/errors/AppError";
import { hash } from "bcryptjs";

interface IUpdateUserService {
  userId: string;
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;
  image?: string | null;
}

class UpdateUserService {
  async execute({ userId, name, email, password, active, image }: IUpdateUserService) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    if (email && email !== user.email) {
      const emailTaken = await prisma.user.findUnique({
        where: { email },
      });

      if (emailTaken) {
        throw new AppError("E-mail já está em uso", 409);
      }
    }

    const data: {
      name?: string;
      email?: string;
      password?: string;
      active?: boolean;
      image?: string | null;
    } = {};

    if (name) data.name = name;
    if (email) data.email = email;
    if (password) data.password = await hash(password, 10);
    if (active !== undefined) data.active = active;
    if (image !== undefined) data.image = image;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return { message: "Usuário atualizado", user: updatedUser };
  }
}

export { UpdateUserService };
