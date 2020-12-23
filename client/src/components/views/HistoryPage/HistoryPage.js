import React from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  width: 80%;
  margin: 3rem auto;
`;

const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

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
`;

function HistoryPage(props) {
  return (
    <Wrapper>
      <TitleWrapper>
        <h1>History</h1>
      </TitleWrapper>
      <Table>
        <thead>
          <tr>
            <Th>Payment Id</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Date of Purchase</Th>
          </tr>
        </thead>
        <tbody>
          {props.user.userData &&
            props.user.userData.history.map((item, index) => (
              <tr key={index}>
                <Td>{item.id}</Td>
                <Td>{item.price}</Td>
                <Td>{item.quantity}</Td>
                <Td>{item.dateOfPurchase}</Td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}

export default HistoryPage;
