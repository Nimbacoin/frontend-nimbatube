import React, { useEffect, useState } from "react";

import Style from "../../styles/pages/watch-later/watch-later.module.css";
import basedGetUrlRequestLogedIn from "../../utils/basedGetUrlRequestLogedIn";

const NotificationPage = () => {
  const [videosData, setVideosData] = useState([]);
  useEffect(() => {
    const locaFetch = async () => {
      await basedGetUrlRequestLogedIn("/api/get/video/watch-later-video/").then(
        (res) => {
          if (res?.responseData) {
            setVideosData(res.responseData);
          }
        }
      );
    };
    locaFetch();
  }, []);
  return <div className={Style.container}></div>;
};

export default NotificationPage;
