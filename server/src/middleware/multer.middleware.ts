import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: {
        fileSize: 70 * 1024 * 1024 // 70 MB
    }
});