import React, { useEffect, useState } from "react";
import ProfileDate from "./newpage-component/ProfileDate";
// import Style from "../../../styles/pages/chanel/my-chanel/my-chanel.module.css";
import Style from "../../../styles/pages/chanel/my-chanel/my-chanel.module.css";
import { useRouter } from "next/router";
import basedGetUrlRequest from "../../../utils/basedGetUrlRequest";
const MychanelPage = () => {
  const Router = useRouter();
  const { asPath } = useRouter();
  const [ChanelData, setChanelData] = useState({});
  useEffect(() => {
    if (typeof window !== "undefined" && !asPath.includes("[")) {
      const ChanelId: string = asPath.replace("/chanel/", "");
      const EditedId: string = ChanelId.toString();
      console.log(EditedId);
      basedGetUrlRequest("/api/get/chanel" + EditedId).then((res: any) => {
        if (res.responsData) {
          setChanelData(res.responsData);
          console.log(res);
        }
      });
    }
  }, [asPath]);
  return (
    <div className={Style.container}>
      <ProfileDate ChanelData={ChanelData} />
    </div>
  );
};

export default MychanelPage;
