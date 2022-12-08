import { GetServerSideProps } from "next";
import React from "react";
import FollowingPage from "../components/following/FollowingPage";
import basedGetUrlRequestLogedIn from "../utils/basedGetUrlRequestLogedIn";
import * as cookie from "cookie";
import basedGetUrlRequest from "../utils/basedGetUrlRequest";

const Following = ({ data }: any) => {
  return <FollowingPage ChannelsData={data} />;
};

export default Following;
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
