import React from "react";
import styles from "./Offerings.module.css";

interface Plan {
  packageID: string;
  pkgName: string;
  planPayment: string;
  validity: number;
  maxUser: number;
  customSlots: number;
  slotCharges?: number;
  webpage: boolean;
  trainerProfiles: number;
  rushHr: boolean;
  userVerification: boolean;
  membershipAnalytics: string;
}

interface Props {
  plans: Plan[];
  selectedPlanID?: string | null;
}

const OfferingsTable: React.FC<Props> = ({ plans, selectedPlanID }) => {
  const rows = [
    { label: "Plan Payment", key: "planPayment" },
    { label: "Validity", key: "validity" },
    { label: "Max User Limit", key: "maxUser" },
    { label: "Custom Membership Slots", key: "customSlots" },
    { label: "Additional Slot (Charges)", key: "slotCharges" },
    { label: "Live Webpage", key: "webpage" },
    { label: "Trainer Profiles", key: "trainerProfiles" },
    { label: "Rush Hour Management", key: "rushHr" },
    { label: "User Verification", key: "userVerification" },
    { label: "Membership Analytics", key: "membershipAnalytics" },
  ];

  return (
    <div className={styles.offeringsContainer}>
      <div className={styles.planChart}>
        <div className={styles.masterComponent}>
          {/* Offerings column */}
          <div className={styles.particularColumn}>
            <div className={styles.offersHeading}>Offerings</div>
            {rows.map((r) => (
              <div key={r.key} className={styles.item}>
                {r.label}
              </div>
            ))}
          </div>

          <div className={styles.divider}>
            <div className={styles.line}></div>
          </div>

          {/* Plan columns */}
          {plans.map((plan, index) => {
            // Determine if this column should be highlighted
            const highlight =
              selectedPlanID &&
              plan.packageID === selectedPlanID &&
              plan.pkgName.toLowerCase() !== "enterprise";

            return (
              <React.Fragment key={plan.pkgName}>
                <div
                  className={`${styles.particularColumn} ${
                    highlight ? styles.activeColumn : ""
                  }`}
                >
                  <div className={styles.offersHeading}>{plan.pkgName}</div>

                  {rows.map((r) => {
                    const val = plan[r.key as keyof Plan];
                    const display =
                      typeof val === "boolean" ? (
                        val ? (
                          <img
                            src={"/choosePlan/tickMark.svg"}
                            className={styles.tickIcon}
                          />
                        ) : (
                          "-"
                        )
                      ) : (
                        val || "-"
                      );

                    return (
                      <div
                        key={r.key}
                        className={`${styles.itemList} ${
                          highlight ? styles.activeCell : ""
                        }`}
                      >
                        {display}
                      </div>
                    );
                  })}
                </div>

                {index !== plans.length - 1 && (
                  <div className={styles.divider}>
                    <div className={styles.line}></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OfferingsTable;
