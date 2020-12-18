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
  let term = req.body.searchTerm;

  let findArgs = {};

  // 클라이언트에서 요청한 req.body.filters에 값이 하나라도 있다면, findArgs에 그 값들을 삽입
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0], // greater then equal
          $lte: req.body.filters[key][1], // less than equal
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  // 선택된 필터 확인
  console.log("findArgs", findArgs);

  term;

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
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
  } else {
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
  }
});

router.get("/products_by_id", (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
    // id = 1234512512, 125r125121, 125r34rt5235 이런 형식을
    // productIds = ['1234512512', '125r125121', '125r34rt5235'] 와 같은 형식으로 바꿈
    let ids = req.query.id.split(",");
    productIds = ids.map((item) => {
      return item;
    });
  }

  // productId를 이용해서 DB에서 productId와 같은 상품의 정보를 가져온다.
  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        return res.status(200).send(product);
      }
    });
});

module.exports = router;
