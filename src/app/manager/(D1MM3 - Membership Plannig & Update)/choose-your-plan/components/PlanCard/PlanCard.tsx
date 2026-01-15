import React from "react";
import Image from "next/image";
import styles from "./PlanCard.module.css";

interface BackendPlan {
  pkgName: string;
  price?: number;
  perUser?: boolean;
  planPayment?: string;
  maxUser?: number;
}

interface PlanCardProps {
  plan: BackendPlan;
  icon: string;
  custom?: boolean;
}

export default function PlanCard({
  plan,
  icon,
  custom = false,
}: PlanCardProps) {
  const isCustom = custom;
  const title = plan.pkgName;
  const cost = isCustom ? "Ask Quotation" : plan.price;
  const perText = !isCustom
    ? plan.perUser
      ? "Per User Per Month"
      : "Per Month"
    : "";

  const description = isCustom
    ? "No User Limit"
    : plan.planPayment === "post-paid"
    ? "No Auto Renewal"
    : `${plan.maxUser} Max Users`;

  return (
    <div className={styles.card}>
      <div className={styles.titleContainer}>
        <div className={styles.iconWrapper}>
          <Image src={icon} alt={title} width={24} height={24} />
        </div>
        <span className={styles.title}>{title}</span>
      </div>

      <div className={styles.priceSection}>
        {!isCustom && <span className={styles.ruppeeLogo}>₹</span>}

        <span className={isCustom ? styles.customText : styles.cost}>
          {cost}
        </span>

        {!isCustom && (
          <div className={styles.perTextContainer}>
            <span className={styles.perText}>{perText}</span>
          </div>
        )}
      </div>

      <div className={styles.divider}></div>

      <div className={styles.descriptionSection}>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
