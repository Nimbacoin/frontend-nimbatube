import React, { useEffect, useState } from "react";
import Style from "../../../../styles/pages/chanel/my-chanel/my-chanel-component/about.module.css";

const About = ({ ChanelData }: any) => {
  console.log();
  const [Description, setDescription] = useState("");
  useEffect(() => {
    if (ChanelData) {
      setDescription(ChanelData.description);
    }
  }, [ChanelData]);
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
