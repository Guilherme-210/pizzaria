import { AppError } from "@/shared/errors/AppError";
import { uploadImage } from "@/utils/uploadImage";
import prisma from "@lib/prisma";
import { hash } from "bcryptjs";

interface ICreateUserServices {
  name: string;
  email: string;
  password: string;
  imageBuffer: Buffer;
  imageName: string;
}

class CreateUserServices {
  async execute({
    name,
    email,
    password,
    imageBuffer,
    imageName,
  }: ICreateUserServices) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError("Usuário já existe", 409);
    }

    const passwordHash = await hash(password, 10);

    let imageUrl: string;

    try {
      const image = await uploadImage({
        imageBuffer,
        folder: "users",
        publicId: `${email.replace(/[^a-zA-Z0-9_-]/g, "-")}-${imageName.split(".")[0]}-${Date.now()}`,
      });

      imageUrl = image.secure_url;
    } catch {
      throw new AppError("Erro ao enviar a imagem do usuário", 500);
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        image: imageUrl,
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
