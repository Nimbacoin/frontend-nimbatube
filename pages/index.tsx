import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Home from "../components/home/Home";

const HomePage: NextPage = () => {
 
  return <Home />;
};

export default HomePage;
