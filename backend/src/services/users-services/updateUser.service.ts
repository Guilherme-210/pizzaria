import prisma from "@/lib/prisma";
import { AppError } from "@/shared/errors/AppError";
import { hash } from "bcryptjs";

interface IUpdateUserService {
  user_id: string;
  name?: string;
  email?: string;
  password?: string;
}

class UpdateUserService {
  async execute({ user_id, name, email, password }: IUpdateUserService) {
    const user = await prisma.user.findUnique({
      where: { id: user_id },
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

    const data: { name?: string; email?: string; password?: string } = {};

    if (name) data.name = name;
    if (email) data.email = email;
    if (password) data.password = await hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: user_id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return { message: "Usuário atualizado", user: updatedUser };
  }
}

export { UpdateUserService };
