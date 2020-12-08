import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import { continents, price } from "./Sections/Datas";

import axios from "axios";
import { Icon, Col, Card, Row, Button } from "antd";
import Meta from "antd/lib/card/Meta";

const Wrapper = styled.div`
  width: 75%;
  margin: 3rem auto;
`;

const TitleWrapper = styled.div`
  text-align: center;
`;

const BtnWrapper = styled.div`
  text-align: center;
  margin: 20px auto 0;
`;

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({ continents: [], price: [] });

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, []);

  // 상품 데이터 요청
  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((res) => {
      if (res.data.success) {
        renderChecker(body, res);
        setPostSize(res.data.postSize);
      } else {
        alert("상품들을 가져오는 데 실패했습니다.");
      }
    });
  };

  // 상품 정보들을 서버에 요청할 때 body에 loadMore 항목이 true로 되어있는지 확인 후 분기처리
  const renderChecker = (body, res) => {
    if (body.loadMore) {
      setProducts([...Products, ...res.data.productInfo]);
    } else {
      setProducts(res.data.productInfo);
    }
  };

  // 더보기 버튼 클릭 시 실행되는 함수
  const loadMoreHandler = () => {
    let skip = Skip + Limit;

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };

    getProducts(body);
    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Meta
            title={product.title}
            description={`$${product.price.toLocaleString()}`}
          />
        </Card>
      </Col>
    );
  });

  // 아래 handleFilters 함수에 종속되어 있는 함수, 서버에 필터 결과 요청
  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };
    getProducts(body);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }

    return array;
  };

  // 체크박스 클릭 시 실행되는 함수
  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    // 인자로 받는 category가 price일 때와 continents일 때를 나누어 분기처리
    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    } else {
      newFilters[category] = filters;
    }
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <h2>
          Let's Travel Anywhere <Icon type="rocket" />
        </h2>
      </TitleWrapper>
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox
            list={continents}
            handleFilters={(filters) => handleFilters(filters, "continents")}
          />
        </Col>
        <Col lg={12} xs={24}>
          <RadioBox
            list={price}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>{renderCards}</Row>
      {PostSize >= Limit && (
        <BtnWrapper>
          <Button onClick={loadMoreHandler}>더보기</Button>
        </BtnWrapper>
      )}
    </Wrapper>
  );
}

export default LandingPage;
