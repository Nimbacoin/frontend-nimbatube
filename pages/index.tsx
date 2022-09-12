import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Home from "../components/home/Home";
import basedGetUrlRequest from "../utils/basedGetUrlRequest";

const HomePage: NextPage = () => {
  return <Home />;
};

export default HomePage;
