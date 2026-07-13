import cloudinary from "@/configs/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { Readable } from "node:stream";

interface UploadImageParams {
  imageBuffer: Buffer;
  folder: string;
  publicId: string;
}

async function uploadImage({
  imageBuffer,
  folder,
  publicId,
}: UploadImageParams): Promise<UploadApiResponse> {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        resource_type: "image",
      },
      (error: Error | undefined, result?: UploadApiResponse) => {
        if (error || !result) return reject(error);

        resolve(result);
      },
    );

    Readable.from(imageBuffer).pipe(uploadStream);
  });
}

export { uploadImage };
