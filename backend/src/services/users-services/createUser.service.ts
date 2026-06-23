import { AppError } from "@/shared/errors/AppError";
import prisma from "@lib/prisma";

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

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
      select: {
        name: true,
        email: true,
      },
    });

    return { message: "Usuário criado", user };
  }
}

export { CreateUserServices };
