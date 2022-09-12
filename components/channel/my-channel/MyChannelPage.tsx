import React, { useEffect, useState } from "react";
import ProfileDate from "./newpage-component/ProfileDate";
// import Style from "../../../styles/pages/channel/my-channel/my-channel.module.css";
import Style from "../../../styles/pages/channel/my-channel/my-channel.module.css";
import { useRouter } from "next/router";
import basedGetUrlRequest from "../../../utils/basedGetUrlRequest";
import Streaming from "./streaming/Streaming";
const MychannelPage = () => {
  const Router = useRouter();
  const { asPath } = useRouter();
  const [ChannelData, setChannelData] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined" && !asPath.includes("[")) {
      const ChannelId: string = asPath.replace("/channel/", "");
      const EditedId: string = ChannelId.toString();
      basedGetUrlRequest("/api/get/channel" + EditedId, false).then(
        (res: any) => {
          try {
            if (res.responsData) {
              setChannelData(res.responsData);
            }
          } catch (error) {
            console.log(error);
          }
        }
      );
    }
  }, [asPath]);
  return (
    <div className={Style.container}>
      <ProfileDate ChannelData={ChannelData} />
    </div>
  );
};

export default MychannelPage;
