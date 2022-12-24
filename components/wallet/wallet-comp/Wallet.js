// import logo from "./logo.svg";
// import "./App.css";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useState, useEffect, useRef } from "react";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
// import Style from "../styles/pages/wallet/wallet.module.css";
// import Style from "../../../styles/pages/wallet/crypto-wallet-connect.module.css";
import Style from "../../../styles/pages/wallet/wallet-comp/wallet.module.css";
import OverAll from "../../modals/OverAll";
import BoldText from "../../modals/BoldText";
import SmallTextBlack from "../../modals/SmallTextBlack";
import TextTilteInputMudum from "../../modals/text/TextTilteInputMudum";
import IconHeader from "../../modals/IconHeader";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import { useDispatch } from "react-redux";
import { walletConnectReducer, walletReducer } from "../../../redux/style-slice/general-style/GenrealStyle";
import CopyInput from "../../modals/CopyInput";
import AbiJson from "../../modals/AbiJson.json";
import CancelButton from "../../modals/CancelButton";
function Wallet() {
  const { active, activate, deactivate, chainId, account, library } =
    useWeb3React();
  const [walletAddress, setWalletAddress] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const [netWorkId, setNetWorkId] = useState("");

  const provider = useRef();
  const contractOjb = useRef();
  var signer;
  var signerAddress;
  const tokenContractAddress = "0x2f8A45dE29bbfBB0EE802B340B4f91af492C6DE7";
  const tokenABI = AbiJson;
  var tokenContract;
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
  const dispatch = useDispatch();
  const handleNetworkSwitch = async (networkName) => {
    await changeNetwork({ networkName, setError });
  };
  const changeNetwork = async ({ networkName, setError }) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");

      await library.provider.request({
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

  const checkConnection = async () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((handleAccountsChanged) => {
          if (handleAccountsChanged && handleAccountsChanged.length >= 1) {
            setWalletAddress(handleAccountsChanged[0]);
          }
        })
        .catch(console.error);
    }
  };
  useEffect(() => {
    checkConnection();
  });

  const handelClose = () => {
    dispatch(walletReducer({ value: false }));
  };

  const startFunction = async () => {
    await ethereum.request({ method: "eth_requestAccounts" });
    provider.current = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.current.getSigner();
    signerAddress = await signer.getAddress();
    tokenContract = await new ethers.Contract(
      tokenContractAddress,
      tokenABI,
      signer
    );
    contractOjb.current = tokenContract;

    if (
      tokenContract &&
      signerAddress &&
      window.ethereum.networkVersion === "56"
    ) {
      const userTokenBalance = await tokenContract.balanceOf(signerAddress);
      setUserBalance(ethers.utils.formatEther(userTokenBalance._hex));
    }
  };
  useEffect(() => {
    startFunction();
  });
  const handelDesconnect = () => {
    deactivate();
    localStorage.removeItem("walletName");
    localStorage.removeItem("walletConnected");
    dispatch(walletConnectReducer({ value: false }));
    dispatch(walletReducer({ value: false }));
  };
  return (
    <OverAll>
      <div className={Style.container}>
        <div className={Style.main_top}>
          <BoldText text={"Your Wallet"} />
          <IconHeader
            FuncOutSide={true}
            MainFuncOutSide={handelClose}
            Icon={<IoCloseOutline />}
          />
        </div>
        <div className={Style.second_container_main}>
          <div className={Style.second_container}>
            <CopyInput
              CopiedText={"Your wallet address copied"}
              Text={"Your Address"}
              Value={walletAddress}
            />
          </div>
          <div className={Style.second_container}>
            <div className={Style.second_container_connect_top}>
              <div
                style={{ backgroundImage: `url("/images/bnb-icon.jpg")` }}
                className={Style.second_container_connect_top_image}
              ></div>

              <span className={Style.text_white}>BNB Smart Chain </span>
            </div>
            <a
              target="_blank"
              href={`https://bscscan.com/address/${walletAddress}`}
              className={Style.second_container_connect_top_right}
            >
              <BoldText text={"BscScan"} />
              <div
                style={{
                  backgroundImage: `url("/images/etherscan-logo.jpg")`,
                }}
                className={Style.second_container_connect_top_image}
              ></div>
            </a>
          </div>
          <div className={Style.second_container_main}>
            {/* <div className={Style.second_container_items}>
              <BoldText text={"BNB Balance"} />{" "}
              <TextTilteInputMudum Text={"0.00"} />
            </div> */}
            <div className={Style.second_container_items}>
              <BoldText text={"NimbaCoin"} />{" "}
              <TextTilteInputMudum Text={userBalance + "    NIMBA"} />
            </div>
          </div>
          <div className={Style.div_button_container}>
            {" "}
            <CancelButton
              Text={"Desconnect"}
              HandelClick={handelDesconnect}
            />{" "}
          </div>
        </div>
      </div>
    </OverAll>
  );
}

export default Wallet;
