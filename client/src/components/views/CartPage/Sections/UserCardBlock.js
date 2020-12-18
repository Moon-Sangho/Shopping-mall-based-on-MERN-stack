import React from "react";
import styled, { css } from "styled-components";

import { Button } from "antd";

const Table = styled.table`
  font-family: Arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;

const tableStyle = css`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const Th = styled.th`
  ${tableStyle};
`;

const Td = styled.td`
  ${tableStyle};

  img {
    width: 70px;
  }
`;

const Tr = styled.tr``;

function UserCardBlock(props) {
  const renderCartImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:5000/${image}`;
    }
  };

  const renderItems = () =>
    props.products &&
    props.products.map((product, index) => (
      <Tr key={index}>
        <Td>
          <img alt="product" src={renderCartImage(product.images)} />
        </Td>
        <Td>{product.quantity} EA</Td>
        <Td>${product.price && product.price.toLocaleString()}</Td>
        <Td>
          <Button onClick={() => props.removeItem(product._id)}>Remove</Button>
        </Td>
      </Tr>
    ));
  return (
    <div>
      <Table>
        <thead>
          <Tr>
            <Th>Product Image</Th>
            <Th>Product Quantity</Th>
            <Th>Product Price</Th>
            <Th>Remove from Cart</Th>
          </Tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </Table>
    </div>
  );
}

export default UserCardBlock;
