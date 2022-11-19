import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionVideoDataChanging } from "../../redux/video-slice/VideoSlice";
import Style from "../../styles/modals/uplaod-first-step2.module.css";
import ButtonAndInputAction from "./ButtonAndInputCopy";
import TextTilteInputMudum from "./text/TextTilteInputMudum";

const UplaodFirstStep2 = () => {
  const Channels = useSelector((state: any) => state.ChannelSlice.allChannels);
  const [VideoLink, setVideoLink] = useState("");
  const dispatch = useDispatch();
  const channelData = Channels[0];
  const [title, setTitle] = useState("");
  const [Bg, setBg] = useState("/images/default-profile.png");
  useEffect(() => {
    if (channelData?.channelData?.profileImg?.url) {
      setBg(
        process.env.NEXT_PUBLIC_BACK_END_URL +
          "/api/get/read/images/" +
          channelData?.channelData?.profileImg?.url
      );
    }
  }, [Channels]);
  const handelChangeDesc = (e: any) => {
    dispatch(
      ActionVideoDataChanging({
        id: "text_desc",
        text_desc: e.target.value,
      })
    );
  };
  const handelChangeTitle = (e: any) => {
    setTitle(e.target.value);
    console.log(e.target.id);
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
              src="https://www.w3schools.com/html/mov_bbb.mp4"
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
              <TextTilteInputMudum Text={channelData?.channelData?.name} />
            </div>
            <div className={Style.container_data}>
              <TextTilteInputMudum Text={title} />
            </div>
          </div>
        </div>

        <div className={Style.second_container}>
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
        </div>
        <ButtonAndInputAction
          Text={"Video link"}
          HandelClick={handelCopy}
          CopyValue={VideoLink}
          ButtonTextValue={"copy"}
        />
      </div>
    </div>
  );
};

export default UplaodFirstStep2;
