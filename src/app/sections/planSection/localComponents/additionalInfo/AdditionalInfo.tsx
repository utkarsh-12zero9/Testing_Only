import React from "react";
import styles from "./AdditionalInfo.module.css";

interface Stat {
  period?: number;
  price: number;
  validity?: number;
  sessionCount?: number;
}

interface AdditionalInfoProps {
  duration: Stat;
  type: string;
}

function AdditionalInfo({ duration, type }: AdditionalInfoProps) {
  const stats =
    type === "Session-Based"
      ? [
          { number: duration.sessionCount, label: "Count", sublabel: "Sessions" },
          { number: duration.validity, label: "Days", sublabel: "Validity" },
          { number: duration.price, label: "INR", sublabel: "Per Session" },
        ]
      : [
          { number: "-", label: "", sublabel: "Sessions" },
          { number: duration.period, label: "Days", sublabel: "Validity" },
          { number: duration.price, label: "INR", sublabel: "Per Session" },
        ];

  const list = stats.map((stat, index) => (
    <React.Fragment key={index}>
      <div className={styles.infoElements}>
        <h1>
          {stat.number}
          <p>{stat.label}</p>
        </h1>
        <hr className={styles.divider} />
        <p>{stat.sublabel}</p>
      </div>
      {index !== stats.length - 1 && <hr className={styles.verticalDivider} />}
    </React.Fragment>
  ));

  return <div className={styles.additionalInfo}>{list}</div>;
}

export default AdditionalInfo;
