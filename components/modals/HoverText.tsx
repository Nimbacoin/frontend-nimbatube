import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Style from "../../styles/pages/modals/hover-text.module.css";

const HoverText = () => {
  const elementTop = useSelector((state: any) => state.GenrealStyle.elementTop);
  const elemntLeft = useSelector((state: any) => state.GenrealStyle.elemntLeft);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [style, setVideoLikes] = useState<object>({});
  useEffect(() => {
    if (containerRef.current) {
      const data = containerRef.current.getBoundingClientRect();
      const width = data.width / 4;
      setVideoLikes({
        left: elemntLeft - width + "px",
        top: elementTop + "px",
      });
    }
  }, [elementTop, elemntLeft]);

  return (
    <div ref={containerRef} style={style} className={Style.container}>
      <div className={Style.second_container}>
        <div className={Style.fliped}></div>
      </div>
    </div>
  );
};

export default HoverText;
