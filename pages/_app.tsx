import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../layout/Layout";
import { store, wrapper } from "../redux/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import SocketHandler from "../libs/socket";
function MyApp({ Component, pageProps }: AppProps) {
  //
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <SocketHandler />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
