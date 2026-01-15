// Developed By: Sanju
"use client";
import styles from "./page.module.css";
import { usePathname, useRouter } from "next/navigation";
import BottomNav from "@/globalComponents/BottomNav/BottomNav";
import DashboardHeader from "@/globalComponents/DashboardHeader/DashboardHeader";
import { useManagerSelector } from "../../Redux/hooks";
import { selectManager } from "../../Redux/slice/manager-slice";
import WelcomeBox from "@/globalComponents/WelcomeBox/WelcomeBox";
import AccessibilityBox from "@/globalComponents/AccessibilityBox/AccessibilityBox";
import Line from "./components/Line/Line";
import InfoBox from "./components/InfoBox/InfoBox";
import { useState } from "react";
import UserVerification from '@/feature-modules/manager/(D1MM9 - User Verification)';

export default function Page() {
  const managerData = useManagerSelector(selectManager);
  const progress = managerData?.accCreated || 0;
  const [isVerificationPopupOpened, setIsVerificationPopupOpened] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  function handleRedirect() {
    if (!managerData?.accCreated) return;
    switch (managerData.accCreated) {
      case 1:
        router.push("/manager/businessSetup");
        break;
      case 2:
        setIsVerificationPopupOpened(true);
        break;
      case 3:
        router.push("/manager/plan");
        break;
      case 4:
        router.push("/manager/webpage");
        break;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainArea}>
        <DashboardHeader profilePicture={managerData?.profilePicture || ""} fullName={managerData?.fullName || ""} />
        <WelcomeBox progress={progress} onClick={handleRedirect} />
        <AccessibilityBox progress={progress} />
        <Line style={{ marginBlock: "10px" }} />
        <InfoBox />
        <Line style={{ margin: "10px 20px", marginBottom: "90px" }} />
        <BottomNav pathname={pathname} />
      </div>

      {isVerificationPopupOpened &&
        <UserVerification onClose={() => setIsVerificationPopupOpened(false)} />}
    </div>
  );
}
