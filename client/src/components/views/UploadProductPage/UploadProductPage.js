import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form, Input } from "antd";

import FileUpload from "../../utils/FileUpload";

const { TextArea } = Input;

const Wrapper = styled.div`
  max-width: 700px;
  margin: 2rem auto;

  input,
  textarea {
    margin-bottom: 20px !important;
  }

  select {
    display: block;
    margin-bottom: 20px;
  }
`;

const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Continents = [
  { id: 1, value: "Africa" },
  { id: 2, value: "Europe" },
  { id: 3, value: "Asia" },
  { id: 4, value: "North America" },
  { id: 5, value: "South America" },
  { id: 6, value: "Australia" },
  { id: 7, value: "Antarctica" },
];

export default function UploadProductPage() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImage] = useState([]);

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  };

  const continentChangeHandler = (event) => {
    setContinent(event.currentTarget.value);
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <h2>여행 상품 업로드</h2>
      </TitleWrapper>
      <Form>
        <FileUpload />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={Title} />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={Description} />
        <label>가격($)</label>
        <Input type="number" onChange={priceChangeHandler} value={Price} />
        <select onChange={continentChangeHandler} value={Continent}>
          {Continents.map((continent) => {
            return (
              <option key={continent.id} value={continent.id}>
                {continent.value}
              </option>
            );
          })}
        </select>
        <Button>확인</Button>
      </Form>
    </Wrapper>
  );
}
