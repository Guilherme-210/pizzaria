import { AppError } from "@/shared/errors/AppError";
import prisma from "@lib/prisma";
import { hash } from "bcryptjs";

interface ICreateUserServices {
  name: string;
  email: string;
  password: string;
}

class CreateUserServices {
  async execute({ name, email, password }: ICreateUserServices) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError("Usuário já existe", 409);
    }

    const passwordHash = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        image: true,
        createdAt: true,
      },
    });

    return { message: "Usuário criado", user };
  }
}

export { CreateUserServices };
