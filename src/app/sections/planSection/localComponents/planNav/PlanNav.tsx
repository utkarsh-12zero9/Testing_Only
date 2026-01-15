// PlanNav.tsx
'use client'
import styles from './PlanNav.module.css'

type BillingPeriod = "All" | "Monthly" | "Quarterly";

interface PlanNavProps {
  isActive: BillingPeriod;
  setIsActive: (period: BillingPeriod) => void;
}

function PlanNav({isActive, setIsActive}: PlanNavProps) {
  return (
    <div className={styles.planNav}>
        <div className={styles.tabButton}>
          <div 
              className={isActive === "All" ? styles.active : styles.container} 
              onClick={() => setIsActive("All")}
            >
              <p>All</p>
            </div>
            <hr className={styles.divider}/>
            <div 
              className={isActive === "Monthly" ? styles.active : styles.container} 
              onClick={() => setIsActive("Monthly")}
            >
              <p>Monthly</p>
            </div>
            <hr className={styles.divider}/>
            <div 
              className={isActive === "Quarterly" ? styles.active : styles.container} 
              onClick={() => setIsActive("Quarterly")}
            >
              <p>Quarterly</p>
            </div>
        </div>
    </div>
  )
}

export default PlanNav