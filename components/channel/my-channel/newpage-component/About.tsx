import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Style from "../../../../styles/pages/channel/my-channel/my-channel-component/about.module.css";
import SmallTextBlack from "../../../modals/SmallTextBlack";
import TextTilteInputMudum from "../../../modals/text/TextTilteInputMudum";

const About = ({ ChannelData }: any) => {
  const [Description, setDescription] = useState("");
  useEffect(() => {
    if (ChannelData) {
      // setDescription(ChannelData.channelData.description);
    }
  }, [ChannelData]);

  const HandelOpenWebsite = (url: string) => {
    // // window.open(url);
    // const box = document.createElement("a");
    // box.href = "wwww" + url;
    // alert(box.href);
    // box.target = "_blank";
    // // box.rel = "noreferrer noopener";
    // box.click();
  };
  return (
    <div className={Style.container}>
      <div className={Style.container_about_links}>
        {ChannelData?.channelData?.description &&
          ChannelData?.channelData?.description !== "" && (
            <>
              <TextTilteInputMudum Text={"Description"} />
              <Link
                href={ChannelData?.channelData?.description}
                prefetch={false}
              >
                <a>
                  <SmallTextBlack
                    Text={ChannelData?.channelData?.description}
                  />
                </a>
              </Link>
            </>
          )}
        {ChannelData?.channelData?.website &&
          ChannelData?.channelData?.website !== "" && (
            <>
              <TextTilteInputMudum Text={"website"} />
              <Link href={ChannelData?.channelData?.website} prefetch={false}>
                <a>
                  <SmallTextBlack Text={ChannelData?.channelData?.website} />
                </a>
              </Link>
            </>
          )}
        {ChannelData?.channelData?.email &&
          ChannelData?.channelData?.email !== "" && (
            <>
              <TextTilteInputMudum Text={"email"} />
              <SmallTextBlack Text={ChannelData?.channelData?.email} />
            </>
          )}
        {ChannelData?.createdAt && ChannelData?.createdAt !== "" && (
          <>
            <TextTilteInputMudum Text={"Joined"} />
            <SmallTextBlack
              Text={moment(ChannelData?.createdAt).format("ll")}
            />
          </>
        )}
      </div>
      <div className={Style.statuse}></div>
    </div>
  );
};

export default About;
