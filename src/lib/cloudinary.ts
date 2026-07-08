import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type CloudinaryUploadResult = {
  public_id: string;
  secure_url: string;
  width?: number;
  height?: number;
  format: string;
  resource_type: string;
};

/**
 * Upload a file buffer to Cloudinary.
 * Returns the secure URL and public_id.
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  options: {
    folder?: string;
    publicId?: string;
    resourceType?: "image" | "video" | "raw" | "auto";
    transformation?: object;
  } = {}
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder ?? "skyluxe",
        public_id: options.publicId,
        resource_type: options.resourceType ?? "auto",
        overwrite: true,
        // Auto quality + format for images
        ...(options.resourceType !== "video" && {
          quality: "auto",
          fetch_format: "auto",
        }),
      },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error("Upload failed"));
        resolve(result as CloudinaryUploadResult);
      }
    );
    uploadStream.end(buffer);
  });
}

/**
 * Delete a file from Cloudinary by public_id.
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "video" | "raw" = "image"
) {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

/**
 * Build a Cloudinary transformation URL.
 * e.g. getImageUrl(url, "w_800,h_600,c_fill,q_auto,f_auto")
 */
export function getImageUrl(cloudinaryUrl: string, transforms: string): string {
  if (!cloudinaryUrl) return "";
  // Insert transforms before the version/public_id segment
  return cloudinaryUrl.replace("/upload/", `/upload/${transforms}/`);
}
