import Cookies from "js-cookie";
import React from "react";

const basedGetUrlRequestLogedIn = async (url: string) => {
  const UserCookie = Cookies.get("user");
  if (url !== "") {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACK_END_URL + url + UserCookie,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  } else {
    const response = await fetch(process.env.NEXT_PUBLIC_BACK_END_URL!, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  }
};

export default basedGetUrlRequestLogedIn;
