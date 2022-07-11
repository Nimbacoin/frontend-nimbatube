import Head from "next/head";
import React from "react";
import Header from "./header/Header";
import { NextSeo } from "next-seo";
import Style from "../styles/layout/layout.module.css";
import SideHeader from "./header/SideHeader";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

interface main {
  children: any;
}
const Layout = ({ children }: any) => {
  const { asPath } = useRouter();

  const MenuBoolean = useSelector((state: any) => state.SideMenu.MenuBoolean);

  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="eK_yN2eql5QORNEY1Yxu9sze98et_wKh_j4Awl-lDlo"
        />
        <link rel="icon" href="/favicon.jpg" />
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
      <div className={Style.container}>
        <Header />
        <SideHeader />
        <div className={Style.children}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
