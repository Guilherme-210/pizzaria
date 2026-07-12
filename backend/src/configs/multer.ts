import { AppError } from "@/shared/errors/AppError";
import multer from "multer";

export default {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (
    _req: any,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new AppError(
          "Formato de arquivo não suportado, use: " +
            allowedMimeTypes.join(", "),
          400,
        ),
      );
    }
  },
};
