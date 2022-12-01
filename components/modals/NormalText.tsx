import React, { useState } from "react";
import Style from "../../styles/modals/input-text.module.css";
const NormalText = ({ Text, Links }: any) => {
  //   let dd = false;
  //   function urlify(text: string) {
  //     var urlRegex = /(https?:\/\/[^\s]+)/g;
  //     const podfodpfop = text.replace(urlRegex, function (url) {
  //       return '<a className={Style.link} href="' + url + '">' + url + "</a>";
  //     });
  //     return podfodpfop;
  //   }
  //   function isValidURL() {
  //     var res = Text.match(
  //       /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  //     );
  //     dd = res !== null;
  //   }
  //   isValidURL();

  // isValidURL(testCase1);
  return (
    <>
      {/* {dd ? (
        <p
          dangerouslySetInnerHTML={{ __html: urlify(Text) }}
          className={Style.norml_text}
        >
         
        </p>
      ) : (
        <p
          dangerouslySetInnerHTML={{ __html: urlify(Text) }}
          className={Style.norml_text}
        >
          {Text}
        </p>
      )} */}

      <p className={Style.norml_text}>{Text}</p>
    </>
  );
};

export default NormalText;
