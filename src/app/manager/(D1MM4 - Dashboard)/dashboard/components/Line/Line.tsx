import { CSSProperties } from "react";
import styles from "./Line.module.css";

export default function Line({ style }: { style?: CSSProperties }) {
  return (
    <div className={styles.line} style={style}></div>
  );
}
