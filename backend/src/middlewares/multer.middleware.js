/*
We need Multer because standard Node.js and Express servers cannot natively parse files sent from the frontend.

Why People Upload to a Backend First?
1. Protects API Secrets: Frontend uploads usually require your Cloudinary API secret key. Exposing this key in browser code allows malicious users to steal it, delete your assets, or abuse your account.
2. Centralised Validation: Your local server can check file sizes and file types before anything hits the cloud, saving you bandwidth and storage costs.
3. Database Syncing: Routing through your server makes it easy to save the image metadata to your own database at the exact same moment the file is processed.

Do we also need multer while accessing files from cloudinary?
No, you never need Multer when accessing or downloading files from Cloudinary.
Multer is strictly an upload middleware used exclusively for handling incoming files sent from a user's browser to a Node.js server.
*/

import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const upload = multer({ storage: storage })