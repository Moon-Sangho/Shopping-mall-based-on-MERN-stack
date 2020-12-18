import React, { useEffect, useState } from "react";
import styled from "styled-components";

import UserCardBlock from "./Sections/UserCardBlock";

import { useDispatch } from "react-redux";
import { getCartItems } from "../../../_actions/user_actions";

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
  };
  return (
    <Wrapper>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock products={props.user.cartDetail} />
      </div>
      <TotalAmountWrapper>
        <h2>Total Amount: ${Total.toLocaleString()}</h2>
      </TotalAmountWrapper>
    </Wrapper>
  );
}

export default CartPage;
