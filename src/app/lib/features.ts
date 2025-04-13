import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";

export const getBase64 = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

export const uploadFilesToCloudinary = async (files = []) => {
  // Cloudinary Setup
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(getBase64(file), {
        resource_type: "auto",
        public_id: uuid(),
      })
    );

    const results = await Promise.all(uploadPromises);

    return results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
  } catch (error) {
    console.error("Cloudinary upload error:", error);
  }
};
