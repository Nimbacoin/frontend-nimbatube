import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  playListRedcuer,
  poPUppRedcuer,
} from "../../redux/style-slice/general-style/GenrealStyle";
import Style from "../../styles/modals/add-to-play-list.module.css";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import basedPostUrlRequestLogedIn from "../../utils/basedPostUrlRequestLogedIn";
import SmallTextBlack from "./SmallTextBlack";
const AddToPalayList = () => {
  const { asPath, pathname } = useRouter();
  const dispatch = useDispatch();
  const ResDD = useSelector(
    (state: any) => state.VideoSlice.mainVideoDataWatch?.library
  );
  const [savedToWatchLater, setsavedToWatchLater] = useState(
    ResDD?.savedToWatchLater
  );
  const [savedToFavorites, setSavedToFavorites] = useState(
    ResDD?.savedToFavorites
  );
  const [message, setMessage] = useState("");

  const handelClickClose = () => {
    dispatch(playListRedcuer({ value: "false" }));
  };

  console.log("ResDD", ResDD);

  const [videoId, setVideoId] = useState<string>("");
  useEffect(() => {
    let Params = new URL(window.location.href).searchParams;
    const video: string | null = Params.get("video");
    const watching: string | null = Params.get("watching");
    const streaming: string | null = Params.get("streaming");
    if (video) {
      setVideoId(video);
    }
  }, [asPath]);

  const handelAddToFavorites = async () => {
    const body: any = { videoId };
    await basedPostUrlRequestLogedIn(
      "/api/post/video/add-to-favorites/",
      body
    ).then((res: any) => {
      const responseData = res?.responseData?.data;
      console.log("res-favorites", responseData);
      setSavedToFavorites(responseData);
      if (responseData) {
        setMessage("Video added to favorites");
      } else if (!responseData) {
        setMessage("Video removed from favorites");
      }
      dispatch(poPUppRedcuer({ data: message }));
      setTimeout(() => {
        dispatch(poPUppRedcuer({ data: "" }));
      }, 5000);
    });
  };
  const handelAddToWatchLater = async () => {
    const body: any = { videoId };
    await basedPostUrlRequestLogedIn(
      "/api/post/video/add-to-watch-later/",
      body
    ).then((res: any) => {
      const responseData = res?.responseData?.data;
      setsavedToWatchLater(responseData);
      if (responseData) {
        setMessage("Video added to watch later");
      } else if (!responseData) {
        setMessage("Video removed from watch later");
      }
      dispatch(poPUppRedcuer({ data: message }));
      setTimeout(() => {
        dispatch(poPUppRedcuer({ data: "" }));
      }, 5000);
    });
  };

  

  return (
    <div className={Style.container}>
      <div className={Style.main_first_container}>
        <div className={Style.main_container}>
          <div className={Style.share_container}>
            <div className={Style.text_container}>
              <p className={Style.text}> Save to </p>
              <button onClick={handelClickClose} className={Style.svg}>
                <IoCloseOutline />
              </button>
            </div>
            <div className={Style.link_container}>
              <div
                onClick={handelAddToWatchLater}
                className={Style.main_link_container}
              >
                {savedToWatchLater ? (
                  <input
                    type="checkbox"
                    checked={true}
                    className={Style.check_box}
                  />
                ) : (
                  <input
                    type="checkbox"
                    checked={false}
                    className={Style.check_box}
                  />
                )}
                <SmallTextBlack Text={"Watch later"} />
              </div>
              <div
                onClick={handelAddToFavorites}
                className={Style.main_link_container}
              >
                {savedToFavorites ? (
                  <input
                    type="checkbox"
                    checked={true}
                    className={Style.check_box}
                  />
                ) : (
                  <input
                    type="checkbox"
                    checked={false}
                    className={Style.check_box}
                  />
                )}
                <SmallTextBlack Text={"Save to favorites"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToPalayList;
