import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
  display: flex;
  justify-content: center;
`;

function LandingPage() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/product/products").then((res) => {
      if (res.data.success) {
        setProducts(res.data.productInfo);
      } else {
        alert("상품들을 가져오는 데 실패했습니다.");
      }
    });
  }, []);

  const renderCards = Products.map((product, index) => {
    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <Card
          cover={
            <img
              alt="productImage"
              src={`http://localhost:5000/${product.images[0]}`}
              style={{ width: "100%", maxHeight: "150px", objectFit: "cover" }}
            />
          }
        >
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
      <BtnWrapper>
        <Button>더보기</Button>
      </BtnWrapper>
    </Wrapper>
  );
}

export default LandingPage;
