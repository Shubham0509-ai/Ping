import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

/*
The Cloudinary Workflow:
1. Upload Phase: Frontend ➔ Multer (on Server) ➔ Cloudinary.
2. Database Phase: Your server saves the resulting Cloudinary URL string into your database.
3. Access Phase: Frontend ➔ Fetches URL from your database ➔ Loads asset directly from Cloudinary.
*/

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        // console.log("File is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export { uploadOnCloudinary }