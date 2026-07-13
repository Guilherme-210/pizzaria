import prisma from "@/lib/prisma";
import { AppError, HttpStatus } from "@/shared/errors/AppError";
import { hash } from "bcryptjs";
import { randomInt } from "crypto";

const PASSWORD_PREFIX = "Pizzaria";
const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SPECIAL_CHARACTERS = "!@#$%&*?";

function getRandomCharacter(characters: string) {
  return characters[randomInt(characters.length)];
}

function generatePassword() {
  const characters = [
    getRandomCharacter(UPPERCASE_LETTERS),
    getRandomCharacter(LOWERCASE_LETTERS),
    getRandomCharacter(NUMBERS),
    getRandomCharacter(SPECIAL_CHARACTERS),
  ];
  const allowedCharacters =
    UPPERCASE_LETTERS + LOWERCASE_LETTERS + NUMBERS + SPECIAL_CHARACTERS;

  while (characters.length < 8) {
    characters.push(getRandomCharacter(allowedCharacters));
  }

  for (let index = characters.length - 1; index > 0; index -= 1) {
    const randomIndex = randomInt(index + 1);
    [characters[index], characters[randomIndex]] = [
      characters[randomIndex],
      characters[index],
    ];
  }

  return PASSWORD_PREFIX + characters.join("");
}

class ResetManagedUserPasswordService {
  async execute(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new AppError("Usuário não encontrado", HttpStatus.NOT_FOUND);
    }

    const password = generatePassword();

    await prisma.user.update({
      where: { id: userId },
      data: { password: await hash(password, 10) },
    });

    return { message: "Senha redefinida com sucesso", password };
  }
}

export { ResetManagedUserPasswordService };
