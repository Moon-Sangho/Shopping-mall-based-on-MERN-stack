import React from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_actions";

import { Descriptions, Button } from "antd";

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

function ProductInfo(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  // 필요한 정보를 Cart filed에 넣어줌
  const clickHandler = () => {
    dispatch(addToCart(props.detail._id));
    alert("상품이 장바구니에 담겼습니다.");
    history.push("/");
  };
  return (
    <div>
      <Descriptions title="Product Info" bordered>
        <Descriptions.Item label="Price">
          {props.detail.price && props.detail.price.toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {props.detail.description}
        </Descriptions.Item>
      </Descriptions>
      <BtnWrapper>
        <Button size="large" shape="round" type="danger" onClick={clickHandler}>
          Add to Cart
        </Button>
      </BtnWrapper>
    </div>
  );
}

export default ProductInfo;
