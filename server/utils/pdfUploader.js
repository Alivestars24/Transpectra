const cloudinary = require("cloudinary").v2;

// Utility function for uploading PDFs to Cloudinary
exports.uploadPdfToCloudinary = async (file, folder) => {
    if (!file || !file.path) {
        throw new Error("Invalid file input: file or file.path is missing");
    }

    const options = {
        folder,
        resource_type: "auto",
    };

    try {
        const result = await cloudinary.uploader.upload(file.path, options);
        return result;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error;
    }
};
