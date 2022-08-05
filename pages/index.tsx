import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Home from "../components/home/Home";
import BasedUrlRequest from "../utils/basedGetUrlRequest";

const HomePage = () => {
  const { data } = useSession();
  // useEffect(() => {
  //   const Fetching = () => {
  //     BasedUrlRequest("/api/hello").then((HSD) => {
  //       console.log(HSD);
  //     });
  //   };
  //   Fetching();
  // }, []);
  BasedUrlRequest("/api/hello").then((HSD) => {
    console.log(HSD);
  });
  let UserId = data?.user?.email;
  let Tokken = data?.accessToken;
  console.log(data, Tokken, UserId);
  return <Home />;
};

export default HomePage;
