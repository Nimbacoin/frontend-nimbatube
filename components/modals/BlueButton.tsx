import React from "react";
import Style from "../../styles/modals/button-black.module.css";
// const BlueButton = ({ HandelClick, Text }: any) => {
//   return (
//     <button
//       onClick={() => {
//         if (HandelClick) {
//           HandelClick();
//         }
//       }}
//       className={Style.blue_button}
//     >
//       {Text ? Text : "submit"}
//     </button>
//   );
// };
const BlueButton = ({
  HandelClick,
  Text,
  children,
  onClick,
  submit,
  HandelSubmit,
}: any) => {
  const [coords, setCoords] = React.useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = React.useState(false);

  React.useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  React.useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);
  const ref = React.useRef<HTMLButtonElement>(null);
  const OnClickEvent = (e: any) => {
    const rect = ref?.current?.getBoundingClientRect();
    if (rect) {
      setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      onClick && onClick(e);
      // HandelClick();
      if (submit) {
        if (ref.current) {
          ref.current.addEventListener("submit", HandelSubmit);
        }
      } else {
        ref.current && ref.current.addEventListener("click", HandelClick);
      }
    }
  };
  React.useEffect(() => {}, []);

  return (
    <button ref={ref} className={Style.ripple_button} onClick={OnClickEvent}>
      {isRippling ? (
        <span
          className={Style.ripple}
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      ) : (
        ""
      )}
      <span className={Style.content}>{children}</span>
      {Text}
    </button>
  );
};

export default BlueButton;
