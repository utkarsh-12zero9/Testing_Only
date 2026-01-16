'use client';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import DashboardHeader from '@/globalComponents/DashboardHeader/DashboardHeader';
import WelcomeBox from '@/globalComponents/WelcomeBox/WelcomeBox';
import AccessibilityBox from '@/globalComponents/AccessibilityBox/AccessibilityBox';

import ActivePendingCards from './components/ActivePendingCards/ActivePendingCards';
import PendingRenewals from './components/PendingRenewals/PendingRenewals';
import DashboardInfo from './components/DashboardInfo/DashboardInfo';

import { useManagerSelector } from '../../Redux/hooks';
import { selectManager } from '../../Redux/slice/manager-slice';
import { getDashboardData } from './api/api';
import { selectBusinessID } from '../../Redux/slice/business-slice';
import BottomNav from '@/globalComponents/BottomNav/BottomNav';

export default function Page() {
  const managerData = useManagerSelector(selectManager);
  const progress = managerData?.accCreated || 0;
  const businessID = useManagerSelector(selectBusinessID);
  const router = useRouter();

  const [dashboardData, setDashboardData] = useState<{
    activeMembers?: number;
    pendingRenewals?: number;
    checkIns?: number;
    expiringSoonMembers?: number;
  } | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        if (!businessID) return;
        const [error, data] = await getDashboardData(businessID);
        if (!error) {
          setDashboardData(data);
        } else {
          console.log("Error fetching dashboard data:", error);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchDashboardData();
  }, [businessID]);

  console.log("Dashboard Data:", dashboardData);

  function handleRedirect() {
    if (!managerData?.accCreated) return;
    switch (managerData.accCreated) {
      case 4:
        router.push("/manager/webpage");
        break;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainArea}>
        <DashboardHeader profilePicture={managerData?.profilePicture || ''} fullName={managerData?.fullName || ''} />
        <WelcomeBox progress={progress} onClick={handleRedirect} />
        <AccessibilityBox progress={progress} />
        <hr className={styles.hr} />

        <ActivePendingCards
          activeMembers={{
            currentCount: dashboardData?.activeMembers || 0,
            percentageChange: 0
          }}
        />
        <hr className={styles.hr} />
        <PendingRenewals
          pendingRenewals={{
            currentCount: dashboardData?.pendingRenewals || 0,
            percentageChange: 0
          }}
        />
        <DashboardInfo
          checkIns={{
            today: { count: dashboardData?.checkIns || 0, percentageChange: 0 },
            thisWeek: { count: dashboardData?.checkIns || 0, percentageChange: 0 },
            thisMonth: { count: dashboardData?.checkIns || 0, percentageChange: 0 }
          }}
          expiringSoonMembers={{
            today: { count: dashboardData?.expiringSoonMembers || 0, percentageChange: 0 },
            thisWeek: { count: dashboardData?.expiringSoonMembers || 0, percentageChange: 0 },
            thisMonth: { count: dashboardData?.expiringSoonMembers || 0, percentageChange: 0 }
          }}
        />
      </div>
      <BottomNav pathname='' />
    </div>
  )
}