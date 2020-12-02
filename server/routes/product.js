const express = require("express");
const router = express.Router();
const multer = require("multer");

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
  // 어디에 파일이 저장되는지 설정
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // 어떤 이름으로 파일을 저장할지 설정
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;
