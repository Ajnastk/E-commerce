const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Check if the uploads folder exists; if not, create it
const uploadDir = path.join(__dirname, '../public/img/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir,{recursive:true});
}

// Set storage engine+
const storage = multer.diskStorage({
    destination: (req, file,cb) => {
        cb(null, uploadDir); // Save files to the uploads directory
    },
    filename: (req, file, cb) => {
        // Create a unique filename based on the original name and current timestamp
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

// Set file filter
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Allowed file types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true); // Accept file
    } else {
        cb('Error: File upload only supports the following filetypes - ' + filetypes); // Reject file
    }
};

// Create Multer instance
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // Limit file size to 1MB
    fileFilter: fileFilter,
});

// Export the upload middleware
module.exports = upload;
