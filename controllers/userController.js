const multer = require("multer");
const fs = require("fs");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/");
  },
  filename: (req, file, cb) => {
    console.log("exp", req.body.expired);
    const expired =
      parseInt(req.body.expired) > 0
        ? parseInt(req.body.expired) * 60000
        : 1000;
    console.log("expired", expired);
    const ext = file.mimetype.split("/")[1];
    const filename = `image-${Date.now()}.${ext}`;
    console.log(filename);
    setTimeout(() => {
      console.log("timeout call");
      fs.unlinkSync(`./public/${filename}`);
    }, expired);
    cb(null, filename);
  },
});

const isImage = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only Image Is Allowed..."));
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: isImage,
});

exports.uploadImage = upload.single("photo");

exports.upload = (req, res) => {
  if (!req.file) {
    console.log("Something Went Wrong");
  }

  try {
    // console.log("file", req.file);
    // console.log("exp", req.body.expired);
    res.status(200).json({
      status: "success",
      fileName: req.file.filename,
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
    });
  }
};

exports.download = (req, res, next) => {
  const imageName = req.query.img;
  const filePath = "public/";
  res.download(`${filePath}${imageName}`);
};
