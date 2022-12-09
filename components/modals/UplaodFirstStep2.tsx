import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionVideoDataChanging } from "../../redux/video-slice/VideoSlice";
import Style from "../../styles/modals/uplaod-first-step2.module.css";
import ButtonAndInputAction from "./ButtonAndInputCopy";
import SmallTextBlack from "./SmallTextBlack";
import TextTilteInputMudum from "./text/TextTilteInputMudum";
import ThumChange from "./ThumChange";
import Thump from "./Thump";

const UplaodFirstStep2 = ({
  VideoLink,
  VideoLocation,
  handelChangeInputImage,
  Thumbnail,
  Step,
}: any) => {
  const Channels = useSelector((state: any) => state.ChannelSlice.allChannels);
  const dispatch = useDispatch();
  const channelData = Channels[0];
  const [title, setTitle] = useState("");
  const [Bg, setBg] = useState("/images/default-profile.png");
  useEffect(() => {
    if (channelData?.channelData?.profileImg?.url) {
      setBg(channelData?.channelData?.profileImg?.url);
    }
  }, [Channels]);
  const handelChangeDesc = (e: any) => {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
      alert("sñld");
    }
    // ("&nbsp");
    dispatch(
      ActionVideoDataChanging({
        id: "text_desc",
        text_desc: e.target.value,
      })
    );
  };
  const handelChangeTitle = (e: any) => {
    setTitle(e.target.value);
    dispatch(
      ActionVideoDataChanging({
        id: "title",
        title: e.target.value,
      })
    );
  };

  const handelCopy = () => {
    navigator.clipboard.writeText(VideoLink);
  };

  return (
    <div className={Style.main_contaier}>
      <div className={Style.main_container_second}>
        <div className={Style.container_top}>
          <div className={Style.video_container_data}>
            <video
              className={Style.video}
              controlsList="nodownload"
              autoPlay
              muted
              loop
              src={VideoLocation}
            >
              your broswer does not Support videos
              <source type="video/mp4" />
            </video>
          </div>
          <div className={Style.right_containr}>
            <div className={Style.container_channel}>
              <div
                style={{ backgroundImage: `url(${Bg})` }}
                className={Style.channel_img}
              ></div>
              <SmallTextBlack Text={channelData?.channelData?.name} />
            </div>
            <div className={Style.container_data}>
              <TextTilteInputMudum
                Text={title.slice(0, 80) + `${title.length > 80 ? "..." : ""}`}
              />
            </div>
          </div>
        </div>

        {}

        {Step == 2 && (
          <>
            {Thumbnail ? (
              <ThumChange Thumbnail={Thumbnail} />
            ) : (
              <Thump handelChangeInputImage={handelChangeInputImage} />
            )}
          </>
        )}
        {Step == 1 && (
          <>
            <input
              placeholder={"write your title here"}
              className={Style.input}
              onChange={handelChangeTitle}
            />
            <textarea
              placeholder={"write your decreption here"}
              className={Style.textarea}
              onChange={handelChangeDesc}
            />
            <div className={Style.second_container}>
              <ButtonAndInputAction
                Text={"Video link"}
                HandelClick={handelCopy}
                CopyValue={VideoLink}
                ButtonTextValue={"copy"}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UplaodFirstStep2;
