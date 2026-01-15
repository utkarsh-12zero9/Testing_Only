/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import getStarUnit from "@/lib/getStarUnit";
import styles from "./PlanCard.module.css";
import AdditionalInfo from "../additionalInfo/AdditionalInfo";
import PrimaryButton from "@/globalComponents/buttons/primaryButton/PrimaryButton";
import Feature from "../feature/Feature";
import Image from "next/image";

interface itemProps {
  ID: string;
  name: string;
  businessID: string;
  QR: {};
  objective: string[];
  membershipType: string;
  keyFeatures: string[];
  durationDetails: any;
  enableOnlinePayment: boolean;
  totalPrice: number;
  avgRating: number;
  totalReviews: number;
}

function PlanCard({ planData, type = "default", isLogin, setIsModalActive }: { planData: itemProps, type?: string, isLogin?: boolean, setIsModalActive?: any }) {

  const featureList = planData.keyFeatures.map((item, index) => (
    <Feature item={item} key={index} />
  ));

  const handleGetStarted = () => {

    if (isLogin) {
      window.location.href = `/payment/${planData.ID}`
    }
    else {
      setIsModalActive(true);
    }
  }

  return (
    <div
      className={styles.card}
      style={{
        borderColor:
          type === "recommended"
            ? "var(--bodytext-primary-green)"
            : "var(--border-dark-blue)",
      }}
    >
      {type === "recommended" && (
        <div className={styles.recommended}>Recommended</div>
      )}
      <div className={styles.cardTitleBlock}>
        <div className={styles.cardTitle}>
          <h1>{planData.name}</h1>
          <h4 style={{
            color: planData.membershipType === "Session-Based" ? "" : "var(--bodytext-primary-blue)",
          }}>
            <span style={{
              color: planData.membershipType === "Session-Based" ? "" : "var(--bodytext-primary-blue)",
            }}>₹</span>{planData.totalPrice}<p>month</p>
          </h4>

          <hr className={styles.divider} />
        </div>
        <div className={styles.type}>
          <p>
            {planData.avgRating} <Image src={getStarUnit(planData.avgRating - 1)} alt="img" height={18} width={18} />
          </p>
          <hr className={styles.verticalDivider} />
          <h4 style={{
            color: planData.membershipType === "Session-Based" ? "" : "var(--bodytext-primary-blue)",
          }}>{planData.membershipType} Plan</h4>
        </div>
      </div>
      <AdditionalInfo duration={planData.durationDetails} type={planData.membershipType} />
      <PrimaryButton className="w-full" onClick={() => handleGetStarted()}>Get started</PrimaryButton>
      <hr className={styles.divider} />

      <p className={styles.keyFeaturesTitle}>Key Features:</p>
      <div className={styles.featuresBlock}>
        <div className={styles.featureList}>
          {featureList}
        </div>
      </div>
    </div>
  );
}

export default PlanCard;
