import React, { useEffect, useRef } from "react";
import Style from "../../../../styles/pages/watch/leftside/descreption.module.css";
import { IoEllipsisHorizontalSharp } from "@react-icons/all-files/io5/IoEllipsisHorizontalSharp";

const Descreption = () => {
  const Title =
    "ily (i love you baby) - Surf Mesa ft. Emilee - acoustic / vocal (cover)";
  // const videoRef = useRef<HTMLVideoElement>(null);
  const Bg =
    "https://scontent.fvit1-1.fna.fbcdn.net/v/t39.30808-6/288368479_5078956948868473_6446883941384535955_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=843cd7&_nc_ohc=QVdNmwF0fz0AX9TaBdI&_nc_ht=scontent.fvit1-1.fna&oh=00_AT8WMfSBJToD6yYf9L12f5oau_uE1Cjj6R15cLiUa_GukQ&oe=62D3771B";

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
