const cloudinary = require("cloudinary").v2;

exports.uploadFileToCloudinary = async (file, folder) => {
  try {
    // Check if the file has the required path property
    if (!file || !file.path) {
      throw new Error("Invalid file input: file or file.path is missing");
    }

    const options = { folder, resource_type: "raw" }; // Set resource_type to "raw" for non-image files
    console.log("Uploading file with options:", options);

    // Upload the file to Cloudinary using the file's path
    const result = await cloudinary.uploader.upload(file.path, options);
    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};
