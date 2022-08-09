import React, { useEffect, useRef } from "react";
import Style from "../../../../styles/pages/watch/leftside/descreption.module.css";
import { IoEllipsisHorizontalSharp } from "@react-icons/all-files/io5/IoEllipsisHorizontalSharp";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import { useDispatch, useSelector } from "react-redux";
import { ToggleDescreption } from "../../../../redux/style-slice/video/MainVideo";

const Descreption = () => {
  const DescreptionBoolean = useSelector(
    (state: any) => state.MainVideo.DescreptionBoolean
  );
  const dispatch = useDispatch();
  const HandelDescreptionToggle = () => {
    dispatch(ToggleDescreption());
  };
  const Title =
    "ily (i love you baby) - Surf Mesa ft. Emilee - acoustic / vocal (cover)";
  // const videoRef = useRef<HTMLVideoElement>(null);
  const Bg = "/images/default-profile.png";

  return (
    <div
      className={DescreptionBoolean ? Style.container_phone : Style.container}
    >
      <div className={Style.container_descreption_phone}>
        <div className={Style.close_rect}></div>
        <div className={Style.phone_desc_container}>
          <span className={Style.descreption}>Descreption</span>
          <button
            onClick={HandelDescreptionToggle}
            className={Style.close_button}
          >
            <IoCloseOutline />
          </button>
        </div>
      </div>
      <div className={Style.video_data}>
        <span className={Style.title}>{Title}</span>
        <div className={Style.video_data_container}>
          <p className={Style.video_data_items}>
            <strong className={Style.strong_data}>1000</strong>
            <small className={Style.small_data}>Likes</small>
          </p>
          <p className={Style.video_data_items}>
            <strong className={Style.strong_data}>1000</strong>
            <small className={Style.small_data}>Views</small>
          </p>
          <p className={Style.video_data_items}>
            <strong className={Style.strong_data}>1 Oct</strong>
            <small className={Style.small_data}>2021</small>
          </p>
        </div>
      </div>
      <div className={Style.descreption_text_container}>
        <p className={Style.descreption_text}>
          Watch Enrique’s new music video ME PASE:
          https://www.youtube.com/watch?v=JE9ur... On Tour with Ricky Martin and
          Sebastian Yatra Fall 2021 Tickets are on sale NOW! Details at:
          https://www.enriqueiglesias.com/tour/ Music: Spotify:
          https://SML.lnk.to/MePaseSingle/spotify Apple Music:
          https://sml.lnk.to/MePaseSingle/apple... Amazon:
          https://SML.lnk.to/MePaseSingle/amazo... iTunes:
          https://SML.lnk.to/MePaseSingle/itunes Deezer:
          https://SML.lnk.to/MePaseSingle/deezer Follow Enrique: Instagram:
          http://www.instagram.com/enriqueiglesias Facebook:
          http://www.facebook.com/enriqueiglesias Twitter:
          http://www.twitter.com/enriqueiglesias Snapchat: Enrique
        </p>
      </div>
      <button className={Style.desc_button}>Show More</button>
    </div>
  );
};

export default Descreption;
