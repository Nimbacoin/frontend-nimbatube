import { IoHomeOutline } from "@react-icons/all-files/io5/IoHomeOutline";
import { IoHeartOutline } from "@react-icons/all-files/io5/IoHeartOutline";
import { IoRibbonOutline } from "@react-icons/all-files/io5/IoRibbonOutline";
import { IoTimeOutline } from "@react-icons/all-files/io5/IoTimeOutline";
import { IoStarOutline } from "@react-icons/all-files/io5/IoStarOutline";
import { IoLayersOutline } from "@react-icons/all-files/io5/IoLayersOutline";
import { RiHistoryLine } from "@react-icons/all-files/ri/RiHistoryLine";
import { GiPartyHat } from "@react-icons/all-files/gi/GiPartyHat";
import { IoWaterOutline } from "@react-icons/all-files/io5/IoWaterOutline";
import { IoBrushOutline } from "@react-icons/all-files/io5/IoBrushOutline";
import { IoBookOutline } from "@react-icons/all-files/io5/IoBookOutline";
import { IoAccessibilityOutline } from "@react-icons/all-files/io5/IoAccessibilityOutline";
import { IoMusicalNotesOutline } from "@react-icons/all-files/io5/IoMusicalNotesOutline";
import { IoGameControllerOutline } from "@react-icons/all-files/io5/IoGameControllerOutline";
import { RiMoneyDollarCircleLine } from "@react-icons/all-files/ri/RiMoneyDollarCircleLine";
import { IoNewspaperOutline } from "@react-icons/all-files/io5/IoNewspaperOutline";
import { IoCompassOutline } from "@react-icons/all-files/io5/IoCompassOutline";
import { FiSmartphone } from "@react-icons/all-files/fi/FiSmartphone";
import { FiMenu } from "@react-icons/all-files/fi/FiMenu";
const NavLinks = [
  { name: "Home", link: "/", icon: <IoHomeOutline /> },
  {
    name: "Following",
    link: "/following",
    icon: <IoHeartOutline />,
  },
  // { name: "Premium", link: "/feed/query?category=premium", icon: <IoRibbonOutline /> },
  {
    name: "Watch Later",
    link: "/watch-later",
    icon: <IoTimeOutline />,
  },
  {
    name: "Favorites",
    link: "/favorites",
    icon: <IoStarOutline />,
  },

  // { name: "Lists", link: "/feed/query?category=lists", icon: <IoLayersOutline /> },
  {
    name: "History",
    link: "/watch-history",
    icon: <RiHistoryLine />,
  },

  {
    name: "Featured",
    link: "/feed/query?category=featured",
    icon: <GiPartyHat />,
  },

  {
    name: "Artists",
    link: "/feed/query?category=artists",
    icon: <IoBrushOutline />,
  },
  {
    name: "Education",
    link: "/feed/query?category=education",
    icon: <IoBookOutline />,
  },
  {
    name: "Lifestyle",
    link: "/feed/query?category=lifestyle",
    icon: <IoAccessibilityOutline />,
  },

  {
    name: "Music",
    link: "/feed/query?category=music",
    icon: <IoMusicalNotesOutline />,
  },
  {
    name: "Gaming",
    link: "/feed/query?category=gaming",
    icon: <IoGameControllerOutline />,
  },
  { name: "Tech", link: "/feed/query?category=tech", icon: <FiSmartphone /> },
  {
    name: "Finance",
    link: "/feed/query?category=finance",
    icon: <RiMoneyDollarCircleLine />,
  },
  {
    name: "News & politics",
    link: "/feed/query?category=news-politics",
    icon: <IoNewspaperOutline />,
  },
  {
    name: "Explore",
    link: "/feed/query?category=explore",
    icon: <IoCompassOutline />,
  },
];

export default NavLinks;
