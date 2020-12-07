import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import { continents } from "./Sections/Datas";

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

  // 체크박스 클릭 시 실행되는 함수
  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    // 상태값 Filters 중 continents 혹은 price 값이 사용자의 선택에 따라 filters 값이 달라짐
    newFilters[category] = filters;

    showFilteredResults(newFilters);
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <h2>
          Let's Travel Anywhere <Icon type="rocket" />
        </h2>
      </TitleWrapper>
      <CheckBox
        list={continents}
        handleFilters={(filters) => handleFilters(filters, "continents")}
      />
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
