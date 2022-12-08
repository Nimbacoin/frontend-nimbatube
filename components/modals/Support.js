import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  playListRedcuer,
  poPUppRedcuer,
} from "../../redux/style-slice/general-style/GenrealStyle";
import Style from "../../styles/modals/support.module.css";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import basedPostUrlRequestLogedIn from "../../utils/basedPostUrlRequestLogedIn";
import TextTilteInputMudum from "./text/TextTilteInputMudum";
import SmallTextBlack from "./SmallTextBlack";
import BlueButton from "./BlueButton";
import CancelButton from "./CancelButton";
import { useSelector } from "react-redux";
const Support = () => {
  const handelClickClose = () => {};
  const { asPath, pathname } = useRouter();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState("");
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const ResDD = useSelector((state) => state.VideoSlice.mainVideoDataWatch);
  console.log("ResDD", ResDD);
  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
          getAccountBalance(result[0]);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
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
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const chainChangedHandler = () => {
    window.location.reload();
  };

  useEffect(() => {
    window.ethereum.on("accountsChanged", accountChangedHandler);
    window.ethereum.on("chainChanged", chainChangedHandler);
    connectWalletHandler();
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
              gasPrice: "0x09184e72a000",
              gas: "0x2710",
            },
          ],
        })
        .then((txHash) => console.log(txHash))
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
                <button onClick={connectWalletHandler}>{connButtonText}</button>
                <div className="accountDisplay">
                  <h3>Address: {defaultAccount}</h3>
                </div>
                <div className="balanceDisplay">
                  <h3>Balance: {userBalance}</h3>
                </div>
                {errorMessage}
              </div>
              <SmallTextBlack Text={"your address"} />
              <input
                type={"number"}
                placeholder="0"
                min="0"
                className={Style.container_input}
              />
              <div className={Style.container_main_buttones}>
                <BlueButton HandelClick={handelSendToken} Text={"Send Tip"} />
                <CancelButton Text={connButtonText} />
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
