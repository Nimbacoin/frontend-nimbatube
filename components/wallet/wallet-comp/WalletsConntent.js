// import logo from "./logo.svg";
// import "./App.css";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";

function App() {
  const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/8ea65bb07c494d30bce16b7fd3fe4f3f`,
    appName: "Web3-react Demo",
    supportedChainIds: [56],
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
    // async function checkConnectionrt3() {
    //   const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    //   const signer = await web3Provider.getSigner();
    //   signer
    //     .getAddress()
    //     .then((address) => {
    //       console.log("address-address", address);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    // checkConnectionrt3();

    checkConnectionrt();
  });

  return (
    <div className="App">
      <button
        onClick={() => {
          activate(CoinbaseWallet);
        }}
      >
        Coinbase Wallet
      </button>
      <br />
      <button
        onClick={() => {
          activate(WalletConnect);
        }}
      >
        Wallet Connect
      </button>
      <br />
      <button
        onClick={() => {
          activate(Injected);
        }}
      >
        Metamask
      </button>
      <br />
      <button onClick={deactivate}>Disconnect</button>
      <div>Connection Status: {active}</div>
      <div>Account: {account}</div>
      <div onClick={() => handleNetworkSwitch("bsc")}>
        Network ID: {chainId}
      </div>
    </div>
  );
}

export default App;
