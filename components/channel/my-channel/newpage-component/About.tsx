import React, { useEffect, useState } from "react";
import Style from "../../../../styles/pages/channel/my-channel/my-channel-component/about.module.css";

const About = ({ ChannelData }: any) => {
  console.log();
  const [Description, setDescription] = useState("");
  useEffect(() => {
    if (ChannelData) {
      setDescription(ChannelData.description);
    }
  }, [ChannelData]);
  return (
    <div className={Style.container}>
      <div className={Style.container_about_links}>
        {Description !== "" && (
          <>
            {" "}
            <h5 className={Style.title}>Description</h5>
            <p className={Style.text}>{Description}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default About;
