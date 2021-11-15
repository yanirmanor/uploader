const express = require("express");
const {
  upload,
  uploadImage,
  download,
} = require("../controllers/userController");
const router = express.Router();

router.post("/upload", uploadImage, upload);

router.get("/download", download);

module.exports = router;
