import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
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
import { ethers } from "ethers";
import AbiJson from "./AbiJson.json";

const Support = () => {
  const { asPath, pathname } = useRouter();
  const dispatch = useDispatch();
  const contractOjb = useRef(null);

  const [defaultAccount, setDefaultAccount] = useState("");
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [etherValue, setEtherValue] = useState("0");
  const [isBNB, setIsBNB] = useState(false);
  const [provider, setProvider] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const [error, setError] = useState("");
  const [netWorkId, setNetWorkId] = useState("");
  const [netWorkTextName, setNetWorkTextName] = useState(
    "Switch to BNB Network"
  );

  const handelClickClose = () => {
    dispatch(supportReducer({ value: false }));
  };
  const ResDD = useSelector((state) => state.VideoSlice.mainVideoDataWatch);
  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          console.log("result", result);
          setConnButtonText("Wallet Connected");

          setDefaultAccount(result[0]);
          Cookies.set("metamask", JSON.stringify({ metamask: true }));
        })
        .catch((error) => {});
    } else {
    }
  };

  // update account, will cause component re-render

  const chainChangedHandler = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (window.ethereum) {
      setNetWorkId(window.ethereum.networkVersion);
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
    }
    window.ethereum.on("chainChanged", chainChangedHandler);
    const isMetaMask = Cookies.get("metamask");

    if (typeof isMetaMask !== "undefined" && isMetaMask?.length >= 1) {
      connectWalletHandler();
      const userMetaMask = JSON.parse(isMetaMask);
    }
  }, []);

  const handelSendToken = () => {
    alert();
    console.log("tokens", contractOjb);
    const rrr = ethers.utils.parseEther(etherValue);
    const valueHex = rrr._hex;
    contractOjb.current.transfer(defaultAccount, valueHex);
  };
  var provider2;
  var signer;
  var signerAddress;

  const tokenContractAddress = "0x2f8A45dE29bbfBB0EE802B340B4f91af492C6DE7";
  const tokenABI = AbiJson;
  var tokenContract;

  const startFunction = async () => {
    await ethereum.request({ method: "eth_requestAccounts" });
    provider2 = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider2.getSigner();
    signerAddress = await signer.getAddress();
    tokenContract = await new ethers.Contract(
      tokenContractAddress,
      tokenABI,
      signer
    );
    contractOjb.current = tokenContract;
    console.log("contractOjb", contractOjb);
    if (tokenContract && signerAddress && netWorkId === "56") {
      setNetWorkTextName("BNB Network");
      const userTokenBalance = await tokenContract.balanceOf(signerAddress);
      setUserBalance(ethers.utils.formatEther(userTokenBalance._hex));
    }
  };

  useEffect(() => {
    if (defaultAccount) {
      (async () => {
        await startFunction();
      })();
    }
  }, [defaultAccount]);

  const networks = {
    polygon: {
      chainId: `0x${Number(137).toString(16)}`,
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://polygon-rpc.com/"],
      blockExplorerUrls: ["https://polygonscan.com/"],
    },
    bsc: {
      chainId: `0x${Number(56).toString(16)}`,
      chainName: "Binance Smart Chain Mainnet",
      nativeCurrency: {
        name: "Binance Chain Native Token",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: [
        "https://bsc-dataseed1.binance.org",
        "https://bsc-dataseed2.binance.org",
        "https://bsc-dataseed3.binance.org",
        "https://bsc-dataseed4.binance.org",
        "https://bsc-dataseed1.defibit.io",
        "https://bsc-dataseed2.defibit.io",
        "https://bsc-dataseed3.defibit.io",
        "https://bsc-dataseed4.defibit.io",
        "https://bsc-dataseed1.ninicoin.io",
        "https://bsc-dataseed2.ninicoin.io",
        "https://bsc-dataseed3.ninicoin.io",
        "https://bsc-dataseed4.ninicoin.io",
        "wss://bsc-ws-node.nariox.org",
      ],
      blockExplorerUrls: ["https://bscscan.com"],
    },
  };
  const handleNetworkSwitch = async (networkName) => {
    await changeNetwork({ networkName, setError });
  };
  const changeNetwork = async ({ networkName, setError }) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName],
          },
        ],
      });
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className={Style.container}>
      <div className={Style.main_first_container}>
        <div className={Style.main_container}>
          <div className={Style.share_container}>
            <button
              onClick={() => handleNetworkSwitch("bsc")}
              className="mt-2 mb-2 bg-warning border-warning btn submit-button focus:ring focus:outline-none w-full"
            >
              {netWorkTextName}
            </button>
            {error}
            {isBNB}
            <>
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
                    <SmallTextBlack Text={"Balance: " + userBalance} />
                  </div>
                </div>
                <div className={Style.container_input_vlaue}>
                  <div className={Style.container_input_coin}>
                    <input
                      // type={"number"}
                      placeholder="0"
                      // min="0"
                      onChange={(e) => {
                        setEtherValue(e.target.value);
                      }}
                      className={Style.container_input}
                    />
                  </div>
                </div>

                <div className={Style.container_main_buttones}>
                  <BlueButton HandelClick={handelSendToken} Text={"Send Tip"} />
                  <CancelButton
                    HandelClick={connectWalletHandler}
                    Text={connButtonText}
                  />
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
