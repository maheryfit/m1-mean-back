const {connect} = require('mongoose');
const config = require('../config');

const mongodbService = connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connecté"))
    .catch(err => console.log(err));

// Redis connection
const redis = require("redis");
const redisService = redis.createClient({
    url: config.REDIS_SERVER_URL,
})
    .on("connect", () => {
        console.log("Redis Connecté");
    })
    .on("error", err => console.error("Redis Client Error", err));

(async () => {
    await redisService.connect();
})()

// Multer config
const multer = require("multer");
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dirname = config.ROOT_FOLDER;
        cb(null, dirname + '/uploads');  // 'uploads' folder will store the uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Use the original file extension
    },
});

// File filter to only allow ext files
const fileFilter = (req, file, cb) => {
    const extname = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = config.ALLOWED_EXTENSION_FILE_IMAGE
    if (!allowedExtensions.includes(extname)) {
        return cb(new Error("Your extension file isn't allowed"), false);  // Reject
    }
    cb(null, true); // Accept the file
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1024
    },
    fileFilter: fileFilter
})

module.exports = {
    mongodbService,
    redisService,
    multer: upload
}
