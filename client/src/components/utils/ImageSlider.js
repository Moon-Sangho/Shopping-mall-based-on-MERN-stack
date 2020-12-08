import React from "react";
import { Carousel } from "antd";

function ImageSlider(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => {
          return (
            <div key={index}>
              <img
                alt="productImage"
                src={`http://localhost:5000/${image}`}
                style={{
                  width: "100%",
                  maxHeight: "150px",
                  objectFit: "cover",
                }}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
