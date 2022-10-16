import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  playListRedcuer,
  poPUppRedcuer,
} from "../../redux/style-slice/general-style/GenrealStyle";
import Style from "../../styles/modals/add-to-play-list.module.css";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import basedPostUrlRequestLogedIn from "../../utils/basedPostUrlRequestLogedIn";
const AddToPalayList = () => {
  const { asPath, pathname } = useRouter();
  const dispatch = useDispatch();
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
    ).then((res: any) => {});
  };
  const handelAddToWatchLater = async () => {
    //add-to-watch-later
    const body: any = { videoId };
    await basedPostUrlRequestLogedIn(
      "/api/post/video/add-to-watch-later/",
      body
    ).then((res: any) => {});
  };
  const listToSave = [
    { name: "Favorites", func: handelAddToFavorites },
    { name: "Watch Later", func: handelAddToWatchLater },
  ];

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
              {listToSave.map(({ name, func }) => (
                <div onClick={func} className={Style.main_link_container}>
                  <input type="checkbox" className={Style.check_box} />
                  <p className={Style.link}>{name}</p>
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
