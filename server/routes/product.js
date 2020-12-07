const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/Product");

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

// 받아온 정보들을 DB에 저장
router.post("/", (req, res) => {
  const product = new Product(req.body);
  product.save((err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    } else {
      return res.status(200).json({ success: true });
    }
  });
});

router.post("/products", (req, res) => {
  // 한 번에 출력할 상품 개수와, 더보기 버튼 클릭시 보여줄 상품 개수를 위한 설정
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  let findArgs = {};

  // 클라이언트에서 요청한 req.body.filters에 값이 하나라도 있다면, findArgs에 그 값들을 삽입
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  // product collection에 들어 있는 상품 정보를 가져오기
  Product.find(findArgs) // 필터된 데이터(findArgs) 찾기
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      } else {
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      }
    });
});

module.exports = router;
