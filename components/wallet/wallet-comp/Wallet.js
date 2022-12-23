// import logo from "./logo.svg";
// import "./App.css";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
// import Style from "../styles/pages/wallet/wallet.module.css";
// import Style from "../../../styles/pages/wallet/crypto-wallet-connect.module.css";
import Style from "../../../styles/pages/wallet/wallet-comp/crypto-wallet-connect.module.css";
import OverAll from "../../modals/OverAll";
import BoldText from "../../modals/BoldText";
import SmallTextBlack from "../../modals/SmallTextBlack";
import TextTilteInputMudum from "../../modals/text/TextTilteInputMudum";
import IconHeader from "../../modals/IconHeader";
import { IoCloseOutline } from "@react-icons/all-files/io5/IoCloseOutline";
import { useDispatch } from "react-redux";
import { walletReducer } from "../../../redux/style-slice/general-style/GenrealStyle";
import CopyInput from "../../modals/CopyInput";
function Wallet() {
  const { active, activate, deactivate, chainId, account, library } =
    useWeb3React();
  const [walletAddress, setWalletAddress] = useState("");
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
            console.log("handleAccountsChanged", handleAccountsChanged[0]);
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
            <CopyInput Text={"Your Address"} Value={walletAddress} />
          </div>
          <div className={Style.second_container}>
            <div className={Style.second_container_connect_top}>
              <div
                style={{ backgroundImage: `url("/images/bnb-icon.jpg")` }}
                className={Style.second_container_connect_top_image}
              ></div>

              <span className={Style.text_white}>BNB Smart Chain </span>
            </div>
            <div className={Style.second_container_connect_top_right}>
              <BoldText text={"BscScan"} />
              <div
                style={{ backgroundImage: `url("/images/etherscan-logo.jpg")` }}
                className={Style.second_container_connect_top_image}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </OverAll>
  );
}

export default Wallet;
