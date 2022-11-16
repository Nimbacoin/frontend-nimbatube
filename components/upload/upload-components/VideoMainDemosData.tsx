import Style from "../../../styles/pages/upload/upload-components/video-main-demos-data.module.css";

const VideoMainDemosData = () => {
  return (
    <div className={Style.main_container}>
      <div className={Style.vedio_container}></div>
      <div className={Style.desc_container}>
        <div className={Style.chanel_data}>
          <div className={Style.chanel_img}></div>
        </div>
        <div className={Style.title_data}>
          <div className={Style.big_bar}></div>
          <div className={Style.small_bar}></div>
        </div>
      </div>
    </div>
  );
};

export default VideoMainDemosData;
