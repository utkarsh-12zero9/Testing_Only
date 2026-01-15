import React from "react";
import styles from "./TabNav.module.css";

interface TabNavProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export default function TabNav({ tabs, activeTab, onTabChange }: TabNavProps) {
  return (
    <div className={styles.container}>
      {tabs.map((tab, index) => {
        const isLast = index === tabs.length - 1;
        return (
          <React.Fragment key={tab}>
            <button
              className={`${styles.tabButton} ${
                index === activeTab ? styles.active : ""
              }`}
              onClick={() => onTabChange(index)}
            >
              {tab}
            </button>
            {!isLast && <div className={styles.divider} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
