import React, { useEffect, useState } from "react";

import "cropperjs/dist/cropper.css";
import Style from "../../styles/modals/cropper-com.module.css";
import {
  CropperRef,
  Cropper,
  FixedCropper,
  ImageRestriction,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const CropperCom: React.FC = () => {
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();
  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };
  const BgRef = React.useRef<HTMLDivElement>(null);
  const Refff = BgRef.current;
  useEffect(() => {
    const bg = Refff;
    if (BgRef.current) {
      BgRef.current.style.backgroundImage = `url({image})`;
    }
  }, [Refff]);

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

  const onChangee = (cropper: CropperRef) => {
    setImage(cropper.getCanvas()?.toDataURL());
  };

  return (
    <div className={Style.container}>
      <div className={Style.main_container_main}>
        <div className={Style.div_main_container_top}>
          <input type="file" onChange={onChange} />
          <button style={{ float: "right" }} onClick={getCropData}>
            Crop Image
          </button>
        </div>
        <div className={Style.main_container_overfollow}>
          <div className={Style.main_container}>
            <div className={Style.container_img}>
              <div className={Style.container_img_coppoer}>
                <FixedCropper
                  src={
                    "https://images.pexels.com/photos/5006465/pexels-photo-5006465.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                  }
                  ref={sdsdsd}
                  onChange={onChangee}
                  stencilSize={{
                    width: 1000,
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropperCom;
