import Head from "next/head";
import React, { useEffect, useState } from "react";
import Header from "./header/Header";
import { NextSeo } from "next-seo";
import Style from "../styles/layout/layout.module.css";
import SideHeader from "./header/SideHeader";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { WindowHeightRedcuer } from "../redux/style-slice/general-style/GenrealStyle";
import { useSession } from "next-auth/react";
import {
  notificationReudcer,
  UserSignedIn,
} from "../redux/user-slice/UserSignIn";
import Cookies from "js-cookie";
import basedGetUrlRequestLogedIn from "../utils/basedGetUrlRequestLogedIn";
import { AllChannelsRedcuer } from "../redux/channel-slice/ChannelSlice";
import HoverText from "../components/modals/HoverText";
import { PopUpp } from "../components/modals/PopUpp";
import ShareVideo from "../components/modals/ShareVideo";
import AddToPalayList from "../components/modals/AddToPlayList";
import CropperCom from "../components/modals/Cropper";

interface main {
  children: any;
}
const Layout = ({ children }: any) => {
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
  const playList = useSelector((state: any) => state.GenrealStyle.playList);
  const UserIsSignedIn = useSelector(
    (state: any) => state.UserSignIn.UserIsSignedIn
  );
  const dispatch = useDispatch();
  const [Height, setHeight] = useState(800);
  useEffect(() => {
    setHeight(window.innerHeight);
    dispatch(WindowHeightRedcuer(window.innerHeight - 60));
  }, []);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    window.addEventListener("load", function () {
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    let UserData = Cookies.get("user");
    if (UserData) {
      var obj = JSON.parse(UserData);
      if (obj.email) {
        dispatch(UserSignedIn(obj));
        if (
          (UserIsSignedIn && asPath === "/auth/sign-up") ||
          asPath === "/auth/sign-in"
        ) {
          Router.push("/");
        }
      }
    }
  });
  useEffect(() => {
    // basedGetUrlRequestLogedIn("/api/get/channel/following-channels/").then(
    //   () => {
    //     alert("As");
    //   }
    // );
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
            console.log(res.responsData.notification);
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  }, [asPath]);

  const menuWidth = useSelector((state: any) => state.SideMenu.menuWidth);
  const childrenRef = React.useRef<HTMLDivElement>(null);
  const handelChangeMenu = () => {
    if (childrenRef.current) {
      if (!menuBooleanAllOver) {
        if (MenuBoolean) {
        } else {
          childrenRef.current.className = Style.childen;
        }
      } else {
        childrenRef.current.className = Style.childen_100;
      }
    }
  };
  useEffect(() => {
    if (childrenRef.current) {
      window.onresize = () => {
        handelChangeMenu();
      };
    }

    if (childrenRef.current) {
      handelChangeMenu();
    }
  });

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />

        <meta
          name="google-site-verification"
          content="eK_yN2eql5QORNEY1Yxu9sze98et_wKh_j4Awl-lDlo"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9261275339248060"
          crossOrigin="anonymous"
        ></script>
        {/* <link rel="icon" href="/favicon.png" /> */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

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
        title="Using More of Config"
        description="This example uses more of the available config options."
        canonical="https://www.canonical.ie/"
        openGraph={{
          url: "https://www.url.ie/a",
          title: "Open Graph Title",
          description: "Open Graph Description",
          images: [
            {
              url: "https://www.example.ie/og-image-01.jpg",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
            {
              url: "https://www.example.ie/og-image-02.jpg",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
              type: "image/jpeg",
            },
            { url: "https://www.example.ie/og-image-03.jpg" },
            { url: "https://www.example.ie/og-image-04.jpg" },
          ],
          site_name: "SiteName",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <div style={{ minHeight: `${Height}px` }} className={Style.container}>
        <Header />
        {playList && <AddToPalayList />}
        {PopUppBoolean && <PopUpp />}
        {copyVideo && <ShareVideo />}
        {cropping && <CropperCom />}

        <SideHeader />

        <div
          ref={childrenRef}
          style={{ minHeight: `${Height}px` }}
          className={MenuBoolean ? Style.childen : Style.childen_MenuBoolean}
        >
          {children}
        </div>

        {isOver && <HoverText />}
      </div>
    </>
  );
};

export default Layout;
