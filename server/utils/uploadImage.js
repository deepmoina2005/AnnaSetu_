import cloudinary from "cloudinary";

/**
 * Uploads an image file to Cloudinary and returns its secure URL.
 * @param {Object} file - The file object from req.files.image
 * @returns {Promise<string>} - Secure URL of the uploaded image
 */
const uploadImage = async (file) => {
  try {
    if (!file || !file.tempFilePath) {
      throw new Error("No file provided or tempFilePath missing");
    }

    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "products",
      resource_type: "image",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);
    throw new Error("Image upload failed");
  }
};

export default uploadImage;
