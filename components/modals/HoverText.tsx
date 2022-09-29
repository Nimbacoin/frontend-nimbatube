import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Style from "../../styles/modals/hover-text.module.css";

const HoverText = ({ Text }: any) => {
  const elementTop = useSelector((state: any) => state.GenrealStyle.elementTop);
  const elemntLeft = useSelector((state: any) => state.GenrealStyle.elemntLeft);
  const textValue = useSelector((state: any) => state.GenrealStyle.textValue);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [style, setVideoLikes] = useState<object>({});
  useEffect(() => {
    if (containerRef.current) {
      const data = containerRef.current.getBoundingClientRect();
      const left = data.left;
      setVideoLikes({
        left: elemntLeft - 20 + "px",
        top: elementTop + "px",
      });
    }
  }, [elementTop, elemntLeft]);

  return (
    <div ref={containerRef} style={style} className={Style.container}>
      <div className={Style.second_container}>
        <div className={Style.triangle_up}></div>
        <div className={Style.content}>
          <p>{textValue}</p>
        </div>
      </div>
    </div>
  );
};

export default HoverText;
