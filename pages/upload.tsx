import { GetServerSideProps } from "next";
import React from "react";
import UploadPage from "../components/upload/UploadPage";
import Cookies from "js-cookie";
import { getCookie } from "cookies-next";
import * as cookie from "cookie";

const Upload = () => {
  return <UploadPage />;
};

export default Upload;
export const getServerSideProps: GetServerSideProps = async (context) => {
  let isLogged = false;
  const cookiesObj = context.req.headers.cookie;
  if (
    typeof cookiesObj !== "undefined" &&
    cookiesObj !== "undefined" &&
    cookiesObj.length > 20
  ) {
    const CookiesParsed = cookie.parse(cookiesObj);
    const User = CookiesParsed.user;

    if (typeof User !== "undefined") {
      const userTokken = JSON.parse(User);
      console.log(userTokken);
      if (userTokken.email) {
        isLogged = true;
        console.log("is loged in ");
      } else {
        isLogged = false;
        console.log("no logged in ");
      }
    } else {
      isLogged = false;
      console.log("no logged in ");
    }
  } else {
    isLogged = false;
    console.log("no logged in ");
  }

  if (!isLogged) {
    return {
      redirect: {
        permanent: false,
        destination: `/auth/sign-in`,
      },
    };
  }
  return {
    props: { data: isLogged },
  };
};
