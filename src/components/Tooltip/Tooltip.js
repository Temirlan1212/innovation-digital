import React, { useState } from "react";
import styles from "./Tooltip.module.css";

const Tooltip = (props) => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div className={styles["Tooltip-Wrapper"]} onMouseEnter={showTip} onMouseLeave={hideTip}>
      {props.children}
      {active && <div className={`${styles["Tooltip-Tip"]} ${styles[props.direction] || styles["top"]}`}>{props.content}</div>}
    </div>
  );
};

export default Tooltip;
