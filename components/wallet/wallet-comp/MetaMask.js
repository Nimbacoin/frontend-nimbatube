import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { Web3NetworkSwitch } from "@web3modal/react";

import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { useWeb3Modal } from "@web3modal/react";
import { useWeb3ModalNetwork } from "@web3modal/react";
import { useWeb3ModalTheme } from "@web3modal/react";
import { Web3Modal } from "@web3modal/react";
import { Web3Button } from "@web3modal/react";

function MetaMask() {
  // const { theme, setTheme } = useWeb3ModalTheme();

  const { isOpen, open, close } = useWeb3Modal();
  // const { selectedChain, setSelectedChain } = useWeb3ModalNetwork();
  console.log("isOpen", isOpen);
  const chains = [
    arbitrum,
    mainnet,

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
  // Wagmi client
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: "<YOUR_PROJECT_ID>" }),
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({ appName: "web3Modal", chains }),
    provider,
  });

  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Web3Button />
        <Web3Modal
          projectId="<YOUR_PROJECT_ID>"
          ethereumClient={ethereumClient}
        />

        <Web3NetworkSwitch />
      </WagmiConfig>
    </>
  );
}

export default MetaMask;

// import React from 'react'

// const MetaMask = () => {
//   return (
//     <div>MetaMask</div>
//   )
// }

// export default MetaMask
