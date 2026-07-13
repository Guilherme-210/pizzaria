import prisma from "@/lib/prisma";
import { AppError } from "@/shared/errors/AppError";
import { hash } from "bcryptjs";
import { Role } from "@/generated/prisma/enums";
import { uploadImage } from "@/utils/uploadImage";

interface IUpdateUserService {
  userId: string;
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;
  imageBuffer?: Buffer;
  imageName?: string;
  role?: Role;
  requesterId?: string;
}

class UpdateUserService {
  async execute({
    userId,
    name,
    email,
    password,
    active,
    imageBuffer,
    imageName,
    role,
    requesterId,
  }: IUpdateUserService) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    if (role !== undefined && role !== user.role) {
      const requester = requesterId
        ? await prisma.user.findUnique({ where: { id: requesterId } })
        : null;

      if (!requester || !requester.active || (requester.role !== Role.SUPER_ADMIN && (role === Role.SUPER_ADMIN || user.role === Role.SUPER_ADMIN))) {
        throw new AppError("Somente super administradores podem adicionar ou remover super administradores", 403);
      }
    }

    if (email && email !== user.email) {
      const emailTaken = await prisma.user.findUnique({
        where: { email },
      });

      if (emailTaken) {
        throw new AppError("E-mail já está em uso", 409);
      }
    }

    let imageUrl: string | undefined;

    if (imageBuffer && imageName) {
      try {
        const image = await uploadImage({
          imageBuffer,
          folder: "users",
          publicId: `${userId}-${imageName.split(".")[0]}-${Date.now()}`,
        });

        imageUrl = image.secure_url;
      } catch {
        throw new AppError("Erro ao enviar a imagem do usuário", 500);
      }
    }

    const data: {
      name?: string;
      email?: string;
      password?: string;
      active?: boolean;
      image?: string | null;
      role?: Role;
    } = {};

    if (name) data.name = name;
    if (email) data.email = email;
    if (password) data.password = await hash(password, 10);
    if (active !== undefined) data.active = active;
    if (imageUrl !== undefined) data.image = imageUrl;
    if (role !== undefined) data.role = role;

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
