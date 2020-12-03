import React, { useState } from "react";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UploadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 240px;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-bottom: 20px;
  cursor: pointer;

  i {
    font-size: 3rem;
  }
`;

const UploadedImageBox = styled.div`
  display: flex;
  width: 350px;
  height: 240px;
  overflow-x: scroll;

  img {
    min-width: 300px;
    width: 300px;
    height: 240px;
    object-fit: cover;
  }
`;

export default function FileUpload(props) {
  const [Images, setImages] = useState([]);

  // 이미지 추가 함수
  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/product/image", formData, config).then((res) => {
      if (res.data.success) {
        setImages([...Images, res.data.filePath]);
        // UploadProductPage 컴포넌트에서 props로 전달해준 refreshFunction 함수
        props.refreshFunction([...Images, res.data.filePath]);
      } else {
        alert("Failed to file upload");
      }
    });
  };

  // 이미지 삭제 함수
  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);
    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <Wrapper>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <UploadBox {...getRootProps()}>
              <input {...getInputProps()} />
              <Icon type="plus" />
            </UploadBox>
          </section>
        )}
      </Dropzone>
      <UploadedImageBox>
        {Images.map((image, index) => {
          return (
            <img
              key={index}
              src={`http://localhost:5000/${image}`}
              alt="uploadedImage"
              onClick={() => deleteHandler(image)}
            />
          );
        })}
      </UploadedImageBox>
    </Wrapper>
  );
}
