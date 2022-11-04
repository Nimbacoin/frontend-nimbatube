import React, { useState, useEffect } from "react";
import {
  CropperRef,
  Cropper,
  FixedCropper,
  ImageRestriction,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

const GettingStartedExample = () => {
  console.log(FixedCropper);
  const sdsdsd = React.useRef(null);
  console.log(sdsdsd.current);
  useEffect(() => {
    if (sdsdsd.current) {
    }
  });
  
  const [image, setImage] = useState<string>();

  const [src] = useState(
    "https://images.unsplash.com/photo-1599140849279-1014532882fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80"
  );

  const onChange = (cropper: CropperRef) => {
    
    setImage(cropper.getCanvas()?.toDataURL());
  };
  return (
    <>
      <img src={image} />
      <button style={{ float: "right" }}>Crop Image</button>
      <FixedCropper
        src={
          "https://images.pexels.com/photos/5006465/pexels-photo-5006465.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        }
        ref={sdsdsd}
        onChange={onChange}
        stencilSize={{
          width: 1100,
          height: 250,
        }}
        stencilProps={{
          handlers: false,
          lines: false,
          movable: false,
          resizable: true,
        }}
        imageRestriction={ImageRestriction.stencil}
      />
    </>
  );
};

export default GettingStartedExample;
