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

export default function FileUpload() {
  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/product/image", formData, config).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setImages([...Images, res.data.filePath]);
      } else {
        alert("Failed to file upload");
      }
    });
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
            />
          );
        })}
      </UploadedImageBox>
    </Wrapper>
  );
}
