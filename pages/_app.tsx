import "../styles/globals.css";
import Layout from "../layout/Layout";
import { store, wrapper } from "../redux/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import SocketHandler from "../libs/socket";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

function getLibrary(provider:any) {
  return new Web3(provider);
}
function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <SocketHandler />
        <Layout>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Component {...pageProps} />
          </Web3ReactProvider>
        </Layout>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
