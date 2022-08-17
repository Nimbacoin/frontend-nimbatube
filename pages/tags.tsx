import Link from "next/link";
import React, { useState } from "react";
// import Style from "../../styles/pages/auth/log-in.module.css";
import basedPostUrlRequest from "../utils/basedPostUrlRequest";
import Style from "../styles/pages/auth/log-in.module.css";

const LogIn = () => {
  const [tag, setTag] = useState("");
  const [message, setMessage] = useState("");

  const HandelLogIn = async (e: any) => {
    e.preventDefault();

    const body: any = { tag };
    basedPostUrlRequest("/api/add-tag", body).then((res) => {
      if (res) {
        setTag("");
        setMessage("tag added");
      }
    });
  };

  return (
    <div className={Style.container}>
      <div className={Style.container_form} onSubmit={HandelLogIn}>
        {message}
        <form className={Style.form} onSubmit={HandelLogIn}>
          <label className={Style.container_inputs}>
            <span className={Style.span}>Tag </span>
            <input
              className={Style.input}
              placeholder="enter your tag Here"
              name="username"
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
                setMessage("");
              }}
              type="text"
            />
          </label>

          <div className={Style.container_actions}>
            <div className={Style.div_button_action}>
              <button
                type="submit"
                onClick={HandelLogIn}
                className={Style.button_action}
              >
                Add A Tag{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
