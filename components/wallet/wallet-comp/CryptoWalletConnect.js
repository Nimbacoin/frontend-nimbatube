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
  const CoinbaseWallet = new WalletLinkConnector({
    // url: `https://mainnet.infura.io/v3/8ea65bb07c494d30bce16b7fd3fe4f3f`,
    appName: "Nimbatube",
    supportedChainIds: [56],
    chainId: 56,
    network: "binance",
  });

  const WalletConnect = new WalletConnectConnector({
    rpcUrl: `https://mainnet.infura.io/v3/8ea65bb07c494d30bce16b7fd3fe4f3f`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
  });

  const Injected = new InjectedConnector({
    supportedChainIds: [56],
  });
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

  const checkConnection = async () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((handleAccountsChanged) => {
          console.log("handleAccountsChanged", handleAccountsChanged);
        })
        .catch(console.error);
    }
  };
  useEffect(() => {
    checkConnection();
    async function checkConnectionrt() {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await web3Provider.getSigner();
      signer
        .getAddress()
        .then((address) => {
          console.log("address-address", address);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    checkConnectionrt();
  });
  const connectorsArray = [
    { name: "Metamask", image: "/images/metamask.png", handelClick: Injected },
    {
      name: "Coinbase",
      image: "/images/coinbase.png",
      handelClick: CoinbaseWallet,
    },
    {
      name: "WalletConnect",
      image: "/images/wallet-connect.png",
      handelClick: () => {
        dispatch(walletConnectReducer({ value: false }));
        open();
      },
    },
  ];
  const handelClose = () => {
    dispatch(walletConnectReducer({ value: false }));
  };
  const connectFunc = (walletName) => {
    dispatch(walletConnectReducer({ value: false }));
    if (walletName === "Metamask") {
      if (isAndroid) {
        if (!window.ethereum) {
          Router.push("https://metamask.app.link/dapp/www.nimbatube.com");
        }
      }
    }
  };

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

  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: "<YOUR_PROJECT_ID>" }),
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({ appName: "web3Modal", chains }),
    provider,
  });
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((handleAccountsChanged) => {
          if (handleAccountsChanged && handleAccountsChanged.length >= 1) {
            setAdreess(handleAccountsChanged[0]);
          }
        })
        .catch(console.error);
    }
  });
  const [Adreess, setAdreess] = useState("");
  return (
    <OverAll>
      <div className={Style.container}>
        <div className={Style.main_top}>
          {"address" + Adreess}
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
            {connectorsArray.slice(0, 2).map(({ image, name, handelClick }) => (
              <div
                onClick={() => {
                  activate(handelClick);
                  connectFunc(name);
                }}
                className={Style.connect_wallet_main_container}
              >
                <div
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                  className={Style.connect_wallet_main_container_image}
                ></div>
                <TextTilteInputMudum Text={name} />
              </div>
            ))}
            {connectorsArray.slice(2, 3).map(({ image, name, handelClick }) => (
              <div
                onClick={handelClick}
                className={Style.connect_wallet_main_container}
              >
                <div
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                  className={Style.connect_wallet_main_container_image}
                ></div>
                <TextTilteInputMudum Text={name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </OverAll>
  );
}

export default CryptoWalletConnect;
