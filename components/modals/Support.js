import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  playListRedcuer,
  poPUppRedcuer,
  supportReducer,
  walletReducer,
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
import SkinyGrayText from "./SkinyGrayText";
import MetaMask from "../wallet/wallet-comp/MetaMask";
import IconHeader from "./IconHeader";

const Support = () => {
  const { asPath, pathname } = useRouter();
  const dispatch = useDispatch();
  const contractOjb = useRef(null);
  const ResDD = useSelector(
    (state) => state.VideoSlice.mainVideoDataWatch?.channelData?.walletId
  );
  const channelData = useSelector(
    (state) => state.VideoSlice.mainVideoDataWatch?.channelData
  );
  const Bg = channelData?.channelData?.profileImg?.url;
  console.log(Bg);
  const [defaultAccount, setDefaultAccount] = useState("");
  const [supportAccount, setSupportAccount] = useState(ResDD);
  const [walletConncetPay, setWalletConncetPay] = useState(false);
  const [walletConncetPayWindowEther, setWalletConncetPayWindowEther] =
    useState(false);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [etherValue, setEtherValue] = useState("1");
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
  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          setConnButtonText("Wallet Connected");
          setDefaultAccount(result[0]);
          Cookies.set("metamask", JSON.stringify({ metamask: true }));
        })
        .catch((error) => {});
    }
  };

  const chainChangedHandler = () => {
    // window.location.reload();
  };

  useEffect(() => {
    if (window.ethereum) {
      setNetWorkId(window.ethereum.networkVersion);
      if (window.ethereum.networkVersion === "56") {
        setIsBNB(true);
      }
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
    }
  }, []);

  const handelSendToken = async () => {
    var walletconnect = JSON.parse(localStorage.getItem("walletconnect"));
    const iswalletConnect = walletconnect?.connected;
    if (supportAccount && supportAccount.length) {
      if (iswalletConnect) {
        setWalletConncetPay(true);
      } else if (!iswalletConnect && window.ethereum) {
        try {
          const rrr = ethers.utils.parseEther(etherValue);
          const valueHex = rrr._hex;
          await contractOjb.current.transfer(supportAccount, valueHex);
        } catch (errro) {}
      }
    }
  };
  var provider2;
  var signer;
  var signerAddress;
  const tokenContractAddress = "0x2f8A45dE29bbfBB0EE802B340B4f91af492C6DE7";
  const tokenABI = AbiJson;
  var tokenContract;

  const startFunction = async () => {
    var walletconnect = JSON.parse(localStorage.getItem("walletconnect"));
    const iswalletConnect = walletconnect?.connected;
    if (!iswalletConnect && window.ethereum) {
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

      if (tokenContract && signerAddress && netWorkId === "56") {
        setNetWorkTextName("BNB Network");
        const userTokenBalance = await tokenContract.balanceOf(signerAddress);
        setUserBalance(ethers.utils.formatEther(userTokenBalance._hex));
      }
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
      if (!window.ethereum) {
        throw new Error("No crypto wallet found");
      } else {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networks[networkName],
            },
          ],
        });
      }
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
    var walletconnect = JSON.parse(localStorage.getItem("walletconnect"));
    const iswalletConnect = walletconnect?.connected;
    console.log(iswalletConnect);
    if (iswalletConnect) {
      setWalletConncetPay(true);
      setWalletConncetPayWindowEther(false);
      setDefaultAccount(walletconnect?.accounts[0]);
      if (walletconnect.chainId == 56) {
        setIsBNB(true);
      }
    }
    if (!iswalletConnect && window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((handleAccountsChanged) => {
          if (handleAccountsChanged && handleAccountsChanged.length >= 1) {
            setWalletConncetPayWindowEther(true);
            setWalletConncetPay(false);
            setDefaultAccount(handleAccountsChanged[0]);
            dispatch(
              walletReducer({
                value: true,
                walletAdress: handleAccountsChanged[0],
              })
            );
          }
        })
        .catch(console.error);
    }
  });

  return (
    <div className={Style.container}>
      <div className={Style.main_first_container}>
        <div className={Style.main_container}>
          <div className={Style.share_container}>
            <div className={Style.text_container}>
              <TextTilteInputMudum Text={"Support"} />
              <IconHeader
                FuncOutSide={true}
                MainFuncOutSide={handelClickClose}
                Icon={<IoCloseOutline />}
              />
            </div>
            <div className={Style.main_second_container}>
              {(() => {
                if (defaultAccount.length <= 0) {
                  return (
                    <CancelButton
                      HandelClick={connectWalletHandler}
                      Text={connButtonText}
                    />
                  );
                } else if (defaultAccount.length >= 1 && !isBNB) {
                  return (
                    <CancelButton
                      HandelClick={() => handleNetworkSwitch("bsc")}
                      Text={netWorkTextName}
                    />
                  );
                }
              })()}
              {isBNB && defaultAccount.length > 10 && (
                <>
                  <div className={Style.link_container}>
                    <div className="walletCard">
                      {/* <div className="accountDisplay">
                      <SmallTextBlack
                        Text={"Your address: " + defaultAccount}
                      />
                      <SmallTextBlack
                        Text={"Your balance: " + userBalance + " NimbaCoin"}
                      />
                    </div> */}
                    </div>
                    <div className={Style.container_input_support_address}>
                      <div className={Style.channe}>
                        <div
                          style={{ backgroundImage: `url(${Bg})` }}
                          className={Style.img}
                        ></div>
                        <TextTilteInputMudum
                          Text={channelData?.channelData?.name}
                        />
                      </div>
                      <div className={Style.container_input_coin}>
                        <SmallTextBlack
                          Text={channelData?.channelData?.name + "address:"}
                        />
                        <input
                          // placeholder="0"
                          defaultValue={supportAccount}
                          onChange={(e) => {
                            setSupportAccount(e.target.value);
                          }}
                          className={Style.container_input_support_id}
                        />
                      </div>
                    </div>
                    <div className={Style.container_input_vlaue}>
                      <div className={Style.container_input_coin}>
                        <SmallTextBlack Text={"NimbaCoin:"} />
                        <input
                          defaultValue={"1"}
                          placeholder="0"
                          onChange={(e) => {
                            setEtherValue(e.target.value);
                          }}
                          className={Style.container_input}
                        />
                        <SkinyGrayText
                          Text={
                            "by clicking send button you will spend the value apove"
                          }
                        />
                      </div>
                    </div>
                    {walletConncetPay && (
                      <MetaMask
                        SupportedAdress={supportAccount}
                        EtherValue={etherValue}
                      />
                    )}
                    {walletConncetPayWindowEther && (
                      <div className={Style.container_main_buttones}>
                        <BlueButton
                          HandelClick={handelSendToken}
                          Text={"Send Tip window"}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
