import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { Web3NetworkSwitch } from "@web3modal/react";
import { useEffect, useRef } from "react";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { useWeb3Modal } from "@web3modal/react";
import { useWeb3ModalNetwork } from "@web3modal/react";
import { useWeb3ModalTheme } from "@web3modal/react";
import { Web3Modal } from "@web3modal/react";
import { Web3Button } from "@web3modal/react";
import Style from "../../../styles/modals/support.module.css";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import AbiJson from "../../modals/AbiJson.json";
import { ethers } from "ethers";
import BlueButton from "../../modals/BlueButton";

function MetaMask({ SupportedAdress, EtherValue }) {
  const { isOpen, open, close } = useWeb3Modal();
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
  console.log(chains);
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: "<YOUR_PROJECT_ID>" }),
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({ appName: "web3Modal", chains }),
    provider,
  });

  useEffect(() => {
    const main = async () => {
      const provider = await new WalletConnectProvider({
        rpc: {
          56: "https://bsc-dataseed1.binance.org",
        },
        chainId: 56,
        network: "binance",
        qrcode: true,
        qrcodeModalOptions: {
          mobileLinks: ["metamask", "trust"],
        },
      });
      provider.networkId = 56;
      await provider.enable();
      var signer;
      var signerAddress;
      const tokenContractAddress = "0x2f8A45dE29bbfBB0EE802B340B4f91af492C6DE7";
      const tokenABI = AbiJson;
      var tokenContract;
      const startFunction = async () => {
        let provider2 = new ethers.providers.Web3Provider(provider);
        signer = provider2.getSigner();
        signerAddress = await signer.getAddress();
        tokenContract = await new ethers.Contract(
          tokenContractAddress,
          tokenABI,
          signer
        );
        const rrr = ethers.utils.parseEther(EtherValue);
        const valueHex = rrr._hex;
        await tokenContract.transfer(SupportedAdress, valueHex);
      };
      await startFunction();
    };
  }, []);
  const handelSendToken = async () => {
    const provider = await new WalletConnectProvider({
      rpc: {
        56: "https://bsc-dataseed1.binance.org",
      },
      chainId: 56,
      network: "binance",
      qrcode: true,
      qrcodeModalOptions: {
        mobileLinks: ["metamask", "trust"],
      },
    });
    provider.networkId = 56;
    await provider.enable();
    var signer;
    var signerAddress;
    const tokenContractAddress = "0x2f8A45dE29bbfBB0EE802B340B4f91af492C6DE7";
    const tokenABI = AbiJson;
    var tokenContract;
    const startFunction = async () => {
      let provider2 = new ethers.providers.Web3Provider(provider);
      signer = provider2.getSigner();
      signerAddress = await signer.getAddress();
      tokenContract = await new ethers.Contract(
        tokenContractAddress,
        tokenABI,
        signer
      );
      const rrr = ethers.utils.parseEther(EtherValue);
      const valueHex = rrr._hex;
      await tokenContract.transfer(SupportedAdress, valueHex).then((data) => {
        console.log("dataaaa", data);
      });
    };
    await startFunction();
  };
  return (
    <div className={Style.container_main_buttones}>
      <BlueButton HandelClick={handelSendToken} Text={"Send Tip wc"} />
    </div>
  );
}

export default MetaMask;
