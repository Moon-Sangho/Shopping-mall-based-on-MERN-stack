import React, { useEffect, useState } from "react";
import styled from "styled-components";

import UserCardBlock from "./Sections/UserCardBlock";

import { useDispatch } from "react-redux";
import { getCartItems, removeCartItem } from "../../../_actions/user_actions";

import { Empty } from "antd";

const Wrapper = styled.div`
  width: 85%;
  margin: 3rem auto;
`;

const TotalAmountWrapper = styled.div`
  margin-top: 3rem;
`;

function CartPage(props) {
  const dispatch = useDispatch();
  const [Total, setToTal] = useState(0);
  const [ShowTotal, setShowTotal] = useState(false);

  useEffect(() => {
    let cartItems = [];

    // 리덕스 User state 안에 cart 안에 상품이 들어있는지 확인
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach((item) => {
          cartItems.push(item.id);
        });

        dispatch(getCartItems(cartItems, props.user.userData.cart)).then(
          (res) => {
            calculateTotal(res.payload);
          }
        );
      }
    }
  }, [props.user.userData]);

  let calculateTotal = (cartDetail) => {
    let total = 0;

    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * item.quantity;
    });
    setToTal(total);
    setShowTotal(true);
  };

  let removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then((res) => {
      if (res.payload.productInfo.length <= 0) {
        setShowTotal(false);
      }
    });
  };

  return (
    <Wrapper>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock
          products={props.user.cartDetail}
          removeItem={removeFromCart}
        />
      </div>
      {ShowTotal ? (
        <TotalAmountWrapper>
          <h2>Total Amount: ${Total.toLocaleString()}</h2>
        </TotalAmountWrapper>
      ) : (
        <>
          <br />
          <Empty description={false} />
        </>
      )}
    </Wrapper>
  );
}

export default CartPage;
