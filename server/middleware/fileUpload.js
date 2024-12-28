const cloudinary = require("cloudinary").v2;

// Utility function to check file type
function isSupportedFileType(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}

// Function to upload an image to Cloudinary
async function uploadToCloudinary(file, folder) {
    const options = { folder, resource_type: "auto" };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// Main function to handle image upload
async function imageUploader(req, res, next) {
    try {
        const file = req.files?.imageFile; // Using optional chaining to safely access imageFile

        if (!file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        const supportedTypes = ["jpg", "jpeg", "pdf", "png"];
        const fileType = file.name.split('.').pop().toLowerCase();
        
        if (!supportedTypes.includes(fileType)) {
            return res.status(400).json({ success: false, message: "File format is not supported" });
        }

        const response = await uploadToCloudinary(file, "superhomes");
        req.body.imageUrl = response.secure_url; // Add imageUrl to req.body for the next middleware/controller

        next(); // Move to the next middleware or controller
    } catch (error) {
        console.error("Error uploading image:", error.message);
        res.status(500).json({ success: false, message: "Image upload failed", error: error.message });
    }
};

module.exports = { imageUploader };