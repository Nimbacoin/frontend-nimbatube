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
import { walletConnectReducer } from "../../../redux/style-slice/general-style/GenrealStyle";
import { isAndroid, isIOS } from "react-device-detect";
import { useRouter } from "next/router";
import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { Account, Connect, NetworkSwitcher } from "./components";
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { Web3NetworkSwitch } from "@web3modal/react";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { useWeb3Modal } from "@web3modal/react";
function CryptoWalletConnect() {
  const Router = useRouter();
  const dispatch = useDispatch();

  const { active, activate, deactivate, chainId, account, library } =
    useWeb3React();
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
  const [Error, setError] = useState("");
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

  const connectorsArray = [
    { name: "MetaMask", image: "/images/metamask.png" },
    {
      name: "Coinbase Wallet",
      image: "/images/coinbase.png",
    },
    {
      name: "WalletConnect",
      image: "/images/wallet-connect.png",
    },
  ];
  const handelClose = async () => {
    dispatch(walletConnectReducer({ value: false }));
  };

  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { isOpen, open, close } = useWeb3Modal();
  // const { selectedChain, setSelectedChain } = useWeb3ModalNetwork();
  const chains = [
    {
      id: 0x38,
      name: "Binance Smart Chain Mainnet",
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
  ];

  

  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  useEffect(() => {
    connectors.map((items) => {
      const main = connectorsArray.filter((x) => x.name === items.name);
      if (main.length >= 1) {
        items.image = main[0].image;
        return items;
      }
    });
  }, []);

  return (
    <OverAll>
      <div className={Style.container}>
        <div className={Style.main_top}>
          <BoldText text={"Connect wallet"} />
          <IconHeader
            FuncOutSide={true}
            MainFuncOutSide={handelClose}
            Icon={<IoCloseOutline />}
          />
        </div>
        <div className={Style.second_container}>
          <SmallTextBlack
            Text={
              "By connecting a wallet, you agree to Uniswap Labs’ Terms of Service and consent to its Privacy Policy."
            }
          />
          <div className={Style.second_container_connect}>
            {/* {isConnected && (
              <>
                <Account />
                <button onClick={() => disconnect()}>Disconnect</button>
                <NetworkSwitcher />
              </>
            )} */}

            {connectors
              .filter((x) => x.ready && x.id !== connector?.id)
              .map((x) => (
                <div
                  onClick={() => {
                    connect({ connector: x });
                    handelClose();
                  }}
                  className={Style.connect_wallet_main_container}
                >
                  <div
                    style={{
                      backgroundImage: `url(${x.image ? x.image : ""})`,
                    }}
                    className={Style.connect_wallet_main_container_image}
                  ></div>

                  <TextTilteInputMudum Text={x.name} />
                  <TextTilteInputMudum
                    Text={
                      isLoading &&
                      x.id === pendingConnector?.id &&
                      " (connecting)"
                    }
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </OverAll>
  );
}

export default CryptoWalletConnect;
