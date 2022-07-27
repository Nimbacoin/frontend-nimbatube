import React, { useEffect, useRef } from "react";
import Style from "../../../../styles/pages/watch/leftside/descreption.module.css";
import { IoEllipsisHorizontalSharp } from "@react-icons/all-files/io5/IoEllipsisHorizontalSharp";

const Descreption = () => {
  const Title =
    "ily (i love you baby) - Surf Mesa ft. Emilee - acoustic / vocal (cover)";
  // const videoRef = useRef<HTMLVideoElement>(null);
  const Bg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRDiptnG_Y2jFrhLCByHAi4Pnor9jbFo2Ouw&usqp=CAU";

  return (
    <div className={Style.container}>
      <div className={Style.descreption}>
        Watch Enrique’s new music video ME PASE:
        https://www.youtube.com/watch?v=JE9ur... On Tour with Ricky Martin and
        Sebastian Yatra Fall 2021 Tickets are on sale NOW! Details at:
        https://www.enriqueiglesias.com/tour/ Music: Spotify:
        https://SML.lnk.to/MePaseSingle/spotify Apple Music:
        https://sml.lnk.to/MePaseSingle/apple... Amazon:
        https://SML.lnk.to/MePaseSingle/amazo... iTunes:
        https://SML.lnk.to/MePaseSingle/itunes Deezer:
        https://SML.lnk.to/MePaseSingle/deezer Follow Enrique: Instagram:
        http://www.instagram.com/enriqueiglesias Facebook:
        http://www.facebook.com/enriqueiglesias Twitter:
        http://www.twitter.com/enriqueiglesias Snapchat: Enrique
      </div>
      <button className={Style.desc_button}>Show More</button>
    </div>
  );
};

export default Descreption;
