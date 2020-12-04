import React, { useState } from "react";
import styled from "styled-components";
import { Button, Form, Input } from "antd";

import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

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

export default function UploadProductPage(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

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

  // FileUpload 컴포넌트에서 등록 또는 삭제한 이미지 데이터들을 받아오기 위한 함수
  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!Title || !Description || !Price || !Continent || !Images) {
      return alert("모든 값을 넣어주셔야 합니다.");
    }

    // 서버에 채운 값들을 request로 보낸다.
    const body = {
      // 로그인 된 사람의 ID
      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      images: Images,
      continents: Continent,
    };

    Axios.post("/api/product", body).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        alert("상품 업로드에 성공 했습니다.");
        props.history.push("/");
      } else {
        alert("상품 업로드에 실패 했습니다.");
      }
    });
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <h2>여행 상품 업로드</h2>
      </TitleWrapper>
      <Form onSubmit={submitHandler}>
        <FileUpload refreshFunction={updateImages} />
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
        <Button type="submit" onClick={submitHandler}>
          확인
        </Button>
      </Form>
    </Wrapper>
  );
}
