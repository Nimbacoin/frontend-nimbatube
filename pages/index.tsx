import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Home from "../components/home/Home";
import basedGetUrlRequest from "../utils/basedGetUrlRequest";

const HomePage: NextPage = () => {
  useEffect(() => {
    basedGetUrlRequest("/api");
  });
  return <Home />;
};

export default HomePage;
