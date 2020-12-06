import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ImageSlider from "../../utils/ImageSlider";

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

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((res) => {
      if (res.data.success) {
        if (body.loadMore) {
          setProducts([...Products, ...res.data.productInfo]);
        } else {
          setProducts(res.data.productInfo);
        }
        setPostSize(res.data.postSize);
      } else {
        alert("상품들을 가져오는 데 실패했습니다.");
      }
    });
  };

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

  return (
    <Wrapper>
      <TitleWrapper>
        <h2>
          Let's Travel Anywhere <Icon type="rocket" />
        </h2>
      </TitleWrapper>
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
