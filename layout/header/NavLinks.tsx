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
  { name: "Following", link: "/following", icon: <IoHeartOutline /> },
  { name: "Premium", link: "/premium", icon: <IoRibbonOutline /> },
  { name: "Watch Later", link: "/watch-later", icon: <IoTimeOutline /> },
  { name: "Favorites", link: "/favorites", icon: <IoStarOutline /> },

  { name: "Lists", link: "/lists", icon: <IoLayersOutline /> },
  { name: "Watch History", link: "/watch-history", icon: <RiHistoryLine /> },

  { name: "Featured", link: "/featured", icon: <GiPartyHat /> },

  { name: "Artists", link: "/artists", icon: <IoBrushOutline /> },
  { name: "Education", link: "/education", icon: <IoBookOutline /> },
  { name: "Lifestyle", link: "/lifestyle", icon: <IoAccessibilityOutline /> },

  { name: "Music", link: "/music", icon: <IoMusicalNotesOutline /> },
  {
    name: "Gaming",
    link: "/gaming",
    icon: <IoGameControllerOutline />,
  },
  { name: "Tech", link: "/tech", icon: <FiSmartphone /> },
  {
    name: "Finance",
    link: "/finance",
    icon: <RiMoneyDollarCircleLine />,
  },
  {
    name: "News & politics",
    link: "/news-politics",
    icon: <IoNewspaperOutline />,
  },
  { name: "Explore", link: "/explore", icon: <IoCompassOutline /> },
];

export default NavLinks;
