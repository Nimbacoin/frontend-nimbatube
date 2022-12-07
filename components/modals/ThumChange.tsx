import Style from "../../styles/modals/thum-change.module.css";

const VideoMainDemosData = ({ Thumbnail }: any) => {
  return (
    <div className={Style.main_container}>
      <div
        style={{
          backgroundImage: `url(${Thumbnail && Thumbnail})`,
        }}
        className={Style.vedio_container}
      ></div>
      <div className={Style.desc_container}>
        {/* <div className={Style.chanel_data}>
          <div className={Style.chanel_img}></div>
        </div> */}
        {/* <div className={Style.title_data}>
          <div className={Style.big_bar}></div>
          <div className={Style.small_bar}></div>
        </div> */}
      </div>
    </div>
  );
};

export default VideoMainDemosData;
