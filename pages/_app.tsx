import "../styles/globals.css";
import Layout from "../layout/Layout";
import { store, wrapper } from "../redux/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import SocketHandler from "../libs/socket";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { MetaMaskProvider } from "metamask-react";

function getLibrary(provider: any) {
  return new Web3(provider);
}
function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <SocketHandler />
        <MetaMaskProvider>
          <Layout>
            <Web3ReactProvider getLibrary={getLibrary}>
              <Component {...pageProps} />
            </Web3ReactProvider>
          </Layout>
        </MetaMaskProvider>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
