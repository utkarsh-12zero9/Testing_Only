import React from "react";
import planData from "./data/planData";
import PlanCard from "./localComponents/planCard/PlanCard";
import styles from "./styles/PlanSection.module.css";

function PlanSection() {
  const list = planData.map((item, index) => (
    <React.Fragment key={index}>
      <PlanCard planData={item} type={(index % 2) + 1} />
    </React.Fragment>
  ));
  return (
    <div
      id="plansSection"
      className={styles.planSection}
      style={{
        background: "url('/landingPageImages/planSection/main.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={styles.overlay}>
        <div className={styles.planSectionTitleBlock}>
          <div className={styles.planSectionTitle}>
            <h1>Plans</h1>
            <p>
              Know Our <span>Plans</span>
            </p>
          </div>
          <p className={styles.description}>
            “We are B2B Business operates on a Subscription-based model designed
            to provide maximum value to gym owners while generating recurring
            revenue for the platform.”
          </p>
        </div>
        <hr className={styles.divider} />
        <div className={styles.planList}>{list}</div>
      </div>
    </div>
  );
}

export default PlanSection;
