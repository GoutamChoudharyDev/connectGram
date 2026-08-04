import multer from "multer"; // it's a middleware that is used to handle file uploads

const storage = multer.memoryStorage(); // store uploaded files temporary in RAM

export const upload = multer({
    storage,
    limits: {
        fileSize: 70 * 1024 * 1024 // 70 MB
    }
});