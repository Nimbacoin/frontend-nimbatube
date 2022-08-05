import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Home from "../components/home/Home";
import BasedUrlRequest from "../utils/basedGetUrlRequest";

const HomePage = () => {
 
  return <Home />;
};

export default HomePage;
