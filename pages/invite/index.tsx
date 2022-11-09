import React from "react";
import BoldText from "../../components/modals/BoldText";
import ButtonAndInputAction from "../../components/modals/ButtonAndInputCopy";
import InputText from "../../components/modals/InputText";
import NormalText from "../../components/modals/NormalText";
import Style from "../../styles/pages/invite/invite.module.css";

const index = () => {
  const HandelCopyLink = () => {};
  const VideoLink = process.env.NEXT_PUBLIC_ClIENT_URL;
  const CopyLinkText =
    "Earn  for inviting subscribers, followers, fans, friends, etc. to join and follow you on Nimbatube. You can use invites just like affiliate links.";
  const VideoEmail =
    "Invite someone you know by email and earn  when they join Nimbatube.";
  return (
    <div className={Style.container}>
      <div className={Style.container_inputs}>
        <div className={Style.container_input_copy}>
          <div className={Style.text_container}>
            <BoldText text={"Invites by Link"} />
            <NormalText Text={CopyLinkText} />
          </div>

          <ButtonAndInputAction
            Text={"Your invite link"}
            HandelClick={HandelCopyLink}
            CopyValue={VideoLink}
          />
        </div>
        <div className={Style.container_input_copy}>
          <div className={Style.text_container}>
            <BoldText text={"Invites by Link"} />
            <NormalText Text={VideoEmail} />
          </div>

          <ButtonAndInputAction
            Text={"Invite by email"}
            HandelClick={HandelCopyLink}
            CopyValue={""}
            ButtonTextValue={"invite"}
          />
        </div>
      </div>
    </div>
  );
};

export default index;
