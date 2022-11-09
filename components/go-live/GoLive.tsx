import React, { useEffect, useState } from "react";
import NameVideoUrl from "./go-live-components/NameVideoUrl";
import Style from "../../styles/pages/go-live/go-live.module.css";
import Thumbnail from "./go-live-components/Thumbnail";
import { IoVideocamOutline } from "@react-icons/all-files/io5/IoVideocamOutline";
import { useRouter } from "next/router";
import basedPostUrlRequestLogedIn from "../../utils/basedPostUrlRequestLogedIn";
import { useSelector } from "react-redux";
import Streaming from "./go-live-components/Streaming";
import GoogleIcon from "../modals/GoogleIcon";
import BlueButton from "../modals/BlueButton";
const GoLivePage = () => {
  const Router = useRouter();
  const { asPath } = useRouter();
  const [goLive, setGoLive] = useState(false);
  const [liveReady, setLiveReady] = useState(false);

  const [videoLink, setVideoLink] = useState("");
  const [videoId, setVideoId] = useState("");
  const channels = useSelector((state: any) => state.ChannelSlice.allChannels);
  const videoData = useSelector((state: any) => state.VideoSlice.videoData);

  useEffect(() => {
    let Params = new URL(window.location.href).searchParams;
    const video: string | null = Params.get("video");
    const ready: string | null = Params.get("ready");
    if (ready && ready === "true") {
      setLiveReady(true);
    }
    if (video) {
      setVideoId(video);
      setGoLive(true);
      setVideoLink(
        process.env.NEXT_PUBLIC_ClIENT_URL +
          "/watch/watch?streaming=true&video=" +
          video
      );
    }
  }, [asPath]);
  const handelSubmiteLiveVideo = async () => {
    const channelId = channels[0]._id;
    const body: any = { channelId, accept: true };
    await basedPostUrlRequestLogedIn(
      "/api/post/stream/create-live-stream/",
      body
    ).then(({ responseData }) => {
      if (responseData) {
        setGoLive(true);
        Router.push("/go-live/go-live?created=true&video=" + responseData._id);
      }
    });
  };
  return (
    <div className={Style.container}>
      {liveReady ? (
        <Streaming />
      ) : (
        <>
          {goLive ? (
            <>
              <NameVideoUrl VideoLink={videoLink} />
              <Thumbnail VideoLink={videoLink} VideoId={videoId} />
            </>
          ) : (
            <div className={Style.go_live}>
              <div className={Style.conainter_live_desc}>
                <div className={Style.go_live_icon}>
                  <GoogleIcon IconName={"video_call"} />
                </div>
                <p className={Style.file_text_title_bold}>Start a Live Video</p>
                <p className={Style.file_text_paragef}>
                  Setup Stream and Start a new Live Stream Video now{" "}
                </p>
              </div>
              <div className={Style.div_button_action}>
                <BlueButton
                  HandelClick={handelSubmiteLiveVideo}
                  Text={"Go Live"}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GoLivePage;
