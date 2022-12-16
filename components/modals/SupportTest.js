import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  playListRedcuer,
  poPUppRedcuer,
  supportReducer,
} from "../../redux/style-slice/general-style/GenrealStyle";
import Style from "../../styles/modals/support.module.css";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import basedPostUrlRequestLogedIn from "../../utils/basedPostUrlRequestLogedIn";
import TextTilteInputMudum from "./text/TextTilteInputMudum";
import SmallTextBlack from "./SmallTextBlack";
import BlueButton from "./BlueButton";
import CancelButton from "./CancelButton";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { ContainerEffectedClick } from "../watch/watch-page/left-side/VideoInfo";
const Support = () => {
  const { asPath, pathname } = useRouter();
  const dispatch = useDispatch();
  const [defaultAccount, setDefaultAccount] = useState("");
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const handelClickClose = () => {
    dispatch(supportReducer({ value: false }));
  };
  const ResDD = useSelector((state) => state.VideoSlice.mainVideoDataWatch);
  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
          getAccountBalance(result[0]);
          Cookies.set("metamask", JSON.stringify({ metamask: true }));
        })
        .catch((error) => {});
    } else {
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
  };

  const getAccountBalance = (account) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then((balance) => {})
      .catch((error) => {});
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  useEffect(() => {
    window.ethereum.on("accountsChanged", accountChangedHandler);
    window.ethereum.on("chainChanged", chainChangedHandler);
    const isMetaMask = Cookies.get("metamask");

    if (typeof isMetaMask !== "undefined" && isMetaMask?.length >= 1) {
      connectWalletHandler();
      const userMetaMask = JSON.parse(isMetaMask);
    }
  }, []);
  const handelSendToken = () => {
    const makeTr = (accountNumber) => {
      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: accountNumber,
              to: "0x2f318C334780961FB129D2a6c30D0763d9a5C970",
              value: "0x29a2241af62c0000",
            },
          ],
        })
        .then((txHash) => {})
        .catch((error) => console.error);
    };
    if (defaultAccount.length >= 1) {
      makeTr(defaultAccount);
    } else {
      connectWalletHandler();
      makeTr();
    }
  };
  return (
    <div className={Style.container}>
      <div className={Style.main_first_container}>
        <div className={Style.main_container}>
          <div className={Style.share_container}>
            <div className={Style.text_container}>
              <TextTilteInputMudum Text={"Support"} />
              <button onClick={handelClickClose} className={Style.svg}>
                <IoCloseOutline />
              </button>
            </div>
            <div className={Style.link_container}>
              <div className="walletCard">
                <div className="accountDisplay">
                  <SmallTextBlack Text={"Your address: " + defaultAccount} />
                </div>
              </div>
              <div className={Style.container_input_vlaue}>
                <div className={Style.container_input_coin}>
                  <input
                    type={"number"}
                    placeholder="0"
                    min="0"
                    className={Style.container_input}
                  />
                </div>
              </div>

              <div className={Style.container_main_buttones}>
                <BlueButton HandelClick={handelSendToken} Text={"Send Tip"} />
                <CancelButton
                  onClick={connectWalletHandler}
                  Text={connButtonText}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <WalletCard /> */}
    </div>
  );
};

export default Support;
