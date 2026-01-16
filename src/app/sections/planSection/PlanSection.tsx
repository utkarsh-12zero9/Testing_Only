// PlanSection.tsx
import { useAppSelector } from '@/app/Redux/hooks'
import PlanCard from './localComponents/planCard/PlanCard'
import PlanNav from './localComponents/planNav/PlanNav'
import styles from './PlanSection.module.css'
import { selectAllPlans, selectNinetyDayPlans, selectThirtyDayPlans } from '@/app/Redux/slice/businessSlice/MembershipPlanData'
import React, { useEffect, useState } from 'react'
import Login from '@/globalComponents/Login/Login'

type BillingPeriod = "All" | "Monthly" | "Quarterly";

function PlanSection() {
  const allPlans = useAppSelector(selectAllPlans);
  const thrityDayplans = useAppSelector(selectThirtyDayPlans);
  const ninetyDayplans = useAppSelector(selectNinetyDayPlans);


  // Set default Plan section to "All" instead of monthly
  const [isActive, setIsActive] = useState<BillingPeriod>("All");
  const [isLogin, setIsLogin] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  const plansToShow = isActive === "All" ? allPlans : isActive === "Monthly" ? thrityDayplans : ninetyDayplans;

  const list = plansToShow?.map((item, index) => (
    <React.Fragment key={index}>
      <PlanCard planData={item} isLogin={isLogin} setIsModalActive={setIsModalActive} />
    </React.Fragment>
  ));

  //  console.log(allPlans);
  useEffect(() => {
    const userID: string | null = localStorage.getItem("userID");
    if (userID) {
      setIsLogin(true);
    }
  }, [])

  return (
    <div id='plansSection' className={styles.planSection} style={{
      background: "url('/landingPageImages/planSection/main.png')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>

      <div className={styles.overlay}>
        <div className={styles.planSectionTitle}>
          <h1>Plans</h1>
          <p>Browse <span>Memberships</span></p>
        </div>
        <div className={styles.tabNav}>
          <PlanNav isActive={isActive} setIsActive={setIsActive} />
        </div>
        <hr className={styles.divider} />
        <div className={styles.planList}>
          {list}
        </div>
      </div>
      {isModalActive && <Login role="customer" />}
    </div>
  )
}

export default PlanSection