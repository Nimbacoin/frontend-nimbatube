import Cookies from "js-cookie";
import React from "react";
interface EnumServiceGetOrderBy {
  email: string;
  password: string;
}

const basedPostUrlRequestLogedIn = async (
  url: string,
  dataBody: EnumServiceGetOrderBy
) => {
  const UserCookie = Cookies.get("user");
  const response = await fetch(
    process.env.NEXT_PUBLIC_BACK_END_URL + url + UserCookie,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(dataBody),
    }
  );
  const data = await response.json();
  return data;
};

export default basedPostUrlRequestLogedIn;
