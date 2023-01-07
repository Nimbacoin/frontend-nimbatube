import React from "react";
import GoLivePage from "../../components/go-live/GoLive";
import * as cookie from "cookie";
import { GetServerSideProps } from "next";

const Index = () => {
  return <GoLivePage />;
};

export default Index;
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
      if (userTokken.email) {
        isLogged = true;
      } else {
        isLogged = false;
      }
    } else {
      isLogged = false;
    }
  } else {
    isLogged = false;
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
