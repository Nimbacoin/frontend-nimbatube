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
  //   const copyToClipboard = () => {
  //     navigator.clipboard.writeText(process.env.NEXT_PUBLIC_ClIENT_URL + asPath);
  //     dispatch(poPUppRedcuer({ data: "video  link is copied" }));
  //     setTimeout(() => {
  //       dispatch(poPUppRedcuer({ data: "" }));
  //     }, 5000);
  //   };
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
      if (responseData) {
        console.log("res", responseData);

        setsavedToWatchLater(responseData);
      }
    });
  };
  const handelAddToWatchLater = async () => {
    //add-to-watch-later
    const body: any = { videoId };
    await basedPostUrlRequestLogedIn(
      "/api/post/video/add-to-watch-later/",
      body
    ).then((res: any) => {
      const responseData = res?.responseData?.data;
      if (responseData) {
        console.log("res", responseData);
        setSavedToFavorites(responseData);
      }
    });
  };
  const listToSave = [
    { name: "Favorites", func: handelAddToFavorites, isIn: savedToFavorites },
    {
      name: "Watch Later",
      func: handelAddToWatchLater,
      isIn: savedToWatchLater,
    },
  ];
  //
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
              {listToSave.map(({ name, func, isIn }) => (
                <div onClick={func} className={Style.main_link_container}>
                  {isIn ? (
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
                  <SmallTextBlack Text={name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToPalayList;
