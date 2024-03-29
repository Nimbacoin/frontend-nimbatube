import Head from "next/head";
import React, { useEffect, useState } from "react";
import Header from "./header/Header";
import { NextSeo } from "next-seo";
import Style from "../styles/layout/layout.module.css";
import SideHeader from "./header/SideHeader";
import { useDispatch, useSelector } from "react-redux";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { useRouter } from "next/router";
import {
  elementOverLaytRedcuer,
  elementOverLaytRedcuerHide,
  WindowHeightRedcuer,
} from "../redux/style-slice/general-style/GenrealStyle";
import { useSession } from "next-auth/react";
import {
  notificationReudcer,
  UserSignedIn,
  userSignedInReucerData,
} from "../redux/user-slice/UserSignIn";
import Cookies from "js-cookie";
import basedGetUrlRequestLogedIn from "../utils/basedGetUrlRequestLogedIn";
import { AllChannelsRedcuer } from "../redux/channel-slice/ChannelSlice";
import HoverText from "../components/modals/HoverText";
import { PopUpp } from "../components/modals/PopUpp";
import ShareVideo from "../components/modals/ShareVideo";
import AddToPalayList from "../components/modals/AddToPlayList";
import CropperCom from "../components/modals/Cropper";
import ButtonLive from "../components/modals/ButtonLive";
import ElementOver from "../components/modals/ElementOver";
import UplaodFile from "../components/modals/uplaod/UplaodFile";
import Support from "../components/modals/Support";
// import Web3 from "web3";
import CryptoWalletConnect from "../components/wallet/wallet-comp/CryptoWalletConnect";
import Wallet from "../components/wallet/wallet-comp/Wallet";
// import Web3Provider from "web3-react";
import { Web3ReactProvider } from "@web3-react/core";
import { Connectors } from "web3-react";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { client } from "./wegmi";
import GoLive from "../components/go-live/GoLive";
// import SocketHandler from "../libs/socket";

const Layout = ({ children }: any) => {
  const chains: any = [
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
  const { asPath } = useRouter();
  const Router = useRouter();
  const MenuBoolean = useSelector((state: any) => state.SideMenu.MenuBoolean);
  const menuBooleanAllOver = useSelector(
    (state: any) => state.SideMenu.menuBooleanAllOver
  );
  const isOver = useSelector((state: any) => state.GenrealStyle.isOver);
  const cropping = useSelector((state: any) => state.GenrealStyle.cropping);

  const PopUppBoolean = useSelector((state: any) => state.GenrealStyle.popUpp);
  const copyVideo = useSelector((state: any) => state.GenrealStyle.copyVideo);
  const support = useSelector((state: any) => state.GenrealStyle.support);
  const walletConnect = useSelector(
    (state: any) => state.GenrealStyle.walletConnect
  );
  const wallet = useSelector((state: any) => state.GenrealStyle.wallet);

  const playList = useSelector((state: any) => state.GenrealStyle.playList);
  const elementOverLayt = useSelector(
    (state: any) => state.GenrealStyle.elementOverLayt
  );
  const UserIsSignedIn = useSelector(
    (state: any) => state.UserSignIn.UserIsSignedIn
  );
  const seoPage = useSelector((state: any) => state.seoReducer.seoPage);
  const dispatch = useDispatch();
  const [Height, setHeight] = useState(800);

  useEffect(() => {
    let userData = Cookies.get("user");
    if (typeof userData !== "undefined") {
      var obj: any = JSON.parse(userData);
      if (obj?.email) {
        dispatch(userSignedInReucerData({ data: obj }));
      }
    }

    const localFetch = async () => {
      await basedGetUrlRequestLogedIn("/api/get/user/user-data/").then(
        (data) => {
          const resData = data?.responseData?.userData;
          if (resData) {
            dispatch(UserSignedIn({ mainUserData: resData }));
          }
        }
      );
    };
    localFetch();
  }, []);
  useEffect(() => {
    if (asPath === "/upload") {
      dispatch(elementOverLaytRedcuer());
    } else {
      dispatch(elementOverLaytRedcuerHide());
    }
    basedGetUrlRequestLogedIn("/api/get/channel/all-channels").then(
      (res: any) => {
        try {
          if (res && res.responsData) {
            if (res?.responsData?.channels) {
              dispatch(AllChannelsRedcuer(res.responsData.channels));
            } else {
              dispatch(AllChannelsRedcuer([]));
            }
            if (res?.responsData?.notification) {
              dispatch(notificationReudcer(res.responsData.notification));
            }
          }
        } catch (error) {}
      }
    );
  }, [asPath]);

  const childrenRef = React.useRef<HTMLDivElement>(null);
  const handelChangeMenu = () => {
    // if (childrenRef.current) {
    //   if (!menuBooleanAllOver) {
    //     if (MenuBoolean) {
    //     } else {
    //       childrenRef.current.className = Style.childen;
    //     }
    //   } else {
    //     childrenRef.current.className = Style.childen_100;
    //   }
    // }
  };

  // function getLibrary(provider: any) {
  //   return new Web3(provider);
  // }
  useEffect(() => {
    if (walletConnect) {
      document.body.style.overflow = "auto";
    }
    if (walletConnect) {
      document.body.style.overflow = "hidden";
    }
  });
  // const { provider } = configureChains(chains, [
  //   walletConnectProvider({ projectId: "9dbf9fb9ce4fdf632ab71fab19f1bac5" }),
  // ]);
  // const wagmiClient = createClient({
  //   autoConnect: true,
  //   connectors: modalConnectors({ appName: "web3Modal", chains }),
  //   provider,
  // });

  return (
    <>
      {/* <Web3ReactProvider getLibrary={getLibrary}> */}
      {/* <SocketHandler /> */}

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: "1 hours sahara quad biking Merzouga ATV Quad rental",
              image:
                "https://marrakechtourcompany.com/wp-content/uploads/2021/01/0wHUTO8OXB.jpg",
              description:
                "1 hours Sahara ATV Quad biking Adventures in Merzouga desert, it is amazing to experience your driving around the sand dunes also",
              brand: "Marrakech Tour Company",
              sku: "2387267",
              offers: {
                "@type": "AggregateOffer",
                url: "https://marrakechtourcompany.com/1-hours-sahara-atv-quad-biking-adventures-in-merzouga-desert/",
                priceCurrency: "EUR",
                lowPrice: "50",
                highPrice: "",
                offerCount: "23",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                bestRating: "5",
                worstRating: "1",
                ratingCount: "235",
              },
            }),
          }}
        />
      </Head>
      <NextSeo
        title={seoPage?.title}
        description="This example uses more of the available config options."
        canonical="https://www.canonical.ie/"
        openGraph={{
          url: "https://www.url.ie/a",
          title: "Nimbatube",
          description: "Open Graph Description",
          images: [
            {
              url: "https://marrakechtourcompany.com/wp-content/uploads/2021/01/0wHUTO8OXB.jpg",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
            {
              url: "https://marrakechtourcompany.com/wp-content/uploads/2021/01/0wHUTO8OXB.jpg",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
              type: "image/jpeg",
            },
            {
              url: "https://marrakechtourcompany.com/wp-content/uploads/2021/01/0wHUTO8OXB.jpg",
            },
            {
              url: "https://marrakechtourcompany.com/wp-content/uploads/2021/01/0wHUTO8OXB.jpg",
            },
          ],
          site_name: "Nimbatube",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      {/* <WagmiConfig client={client}> */}
      <div style={{ minHeight: `${Height}px` }} className={Style.container}>
        <Header />
        {playList && <AddToPalayList />}
        {PopUppBoolean && <PopUpp />}
        {copyVideo && <ShareVideo />}
        {cropping && <CropperCom />}
        {support && <Support />}
        {/* {walletConnect && <CryptoWalletConnect />}
          {wallet && <Wallet />} */}
        <SideHeader />
        {/* <div
          ref={childrenRef}
          style={{ minHeight: `${Height}px` }}
          className={MenuBoolean ? Style.childen : Style.childen_MenuBoolean}
        >
          {children}
        </div> */}
        {(() => {
          if (
            asPath.includes("/sign-in") ||
            asPath.includes("/chanel/new") ||
            asPath.includes("/sign-up") ||
            asPath.includes("/watch/") ||
            asPath.includes("/channel/create-new-channel/") ||
            asPath.includes("edit-channel")
          ) {
            return (
              <div
                ref={childrenRef}
                style={{ minHeight: `${Height}px` }}
                className={Style.childen_100}
              >
                {children}
              </div>
            );
          } else {
            if (MenuBoolean) {
              return (
                <div
                  ref={childrenRef}
                  style={{ minHeight: `${Height}px` }}
                  className={Style.childen}
                >
                  {children}
                </div>
              );
            } else {
              return (
                <div
                  ref={childrenRef}
                  style={{ minHeight: `${Height}px` }}
                  className={Style.childen_MenuBoolean}
                >
                  {children}
                </div>
              );
            }
          }
        })()}
        {isOver && <HoverText />}
        {""}
        {/* {elementOverLayt && <UplaodFile />} */}
        {asPath.includes("/go-live/go-live") && <GoLive />}
        <ButtonLive />
      </div>
      {/* </WagmiConfig> */}
      {/* </Web3ReactProvider> */}
    </>
  );
};

export default Layout;
