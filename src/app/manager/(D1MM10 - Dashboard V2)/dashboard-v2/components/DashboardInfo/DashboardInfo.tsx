import styles from './DashboardInfo.module.css';

import TabNav from "@/globalComponents/TabNav/TabNav";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";

import checkInIcon from '../../icons/check-in.svg';
import expiringSoonIcon from '../../icons/expiring-soon.svg';

import CardContent from "../Card/CardContent";
import CardDevider from "../Card/CardDevider";
import CardFooter from "../Card/CardFooter";
import RushHourIndicator from '@/app/manager/(D1MM10 - Dashboard V2)/dashboard-v2/components/RushHourIndicator/RushHourIndicator';
import { useState } from 'react';

type CountData = {
  count: number;
  percentageChange: number;
}
type CardData = {
  today: CountData;
  thisWeek: CountData;
  thisMonth: CountData;
}

type DashboardInfoProps = {
  checkIns: CardData,
  expiringSoonMembers: CardData;
}
const TAB_NAMES = ['today', 'thisWeek', 'thisMonth'] as const;
export default function DashboardInfo({ checkIns, expiringSoonMembers }: DashboardInfoProps) {
  const [activeTab, setActiveTab] = useState(0);
  const activeTabName = TAB_NAMES[activeTab];

  return (
    <div className={styles.container}>
      <TabNav tabs={['Today', 'This Week', 'This Month']} activeTab={activeTab} onTabChange={(i)=>setActiveTab(i)} />
        
      <div className={styles.cardsContainer}>
        <Card>
          <CardHeader icon={checkInIcon} title="Check-ins" />
          <CardContent number={checkIns?.[activeTabName]?.count} label="Today" />
          <CardDevider />
          <CardFooter percentage={checkIns?.[activeTabName]?.percentageChange} comparison="vs Yesterday" />
        </Card>
        <Card>
          <CardHeader icon={expiringSoonIcon} iconColor='var(--primary-blue-black-1)' title="Expiring Soon" />
          <CardContent number={expiringSoonMembers?.[activeTabName]?.count} numberColor='var(--primary-blue-black-1)' label="Within Today" />
          <CardDevider />
          <CardFooter percentage={expiringSoonMembers?.[activeTabName]?.percentageChange} comparison="vs Yesterday" />
        </Card>
      </div>
      
      <RushHourIndicator tab={activeTabName} />
    </div>
  )
};
