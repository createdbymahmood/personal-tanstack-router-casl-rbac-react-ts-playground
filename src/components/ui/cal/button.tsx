import { useRef } from "react";
import { useButton } from "@react-aria/button";
import * as styles from "./styles.module.css";

export function Button(props) {
  const ref = useRef();
  const { buttonProps } = useButton(props, ref);
  return (
    <button {...buttonProps} ref={ref} className={styles.button}>
      {props.children}
    </button>
  );
}
