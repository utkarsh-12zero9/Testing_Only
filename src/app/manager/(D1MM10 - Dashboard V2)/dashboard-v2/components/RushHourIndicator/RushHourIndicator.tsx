import { useEffect, useState } from 'react';
import styles from './RushHourIndicator.module.css';

import rushHourIcon from '../../icons/rush-hour.svg';
import Image from 'next/image';
import AMPMChart from './AMPMChart';
import { getRushHourData } from '../../api/api';
import { useManagerSelector } from '@/app/manager/Redux/hooks';
import { selectBusinessID } from '@/app/manager/Redux/slice/business-slice';

type RushHourIndicatorProps = {
  tab: 'today' | 'thisWeek' | 'thisMonth';
}


type RushHour = {
  hour: number;
  count: number;
}

type RushHours = {
  today: RushHour[];
  thisWeek: RushHour[];
  thisMonth: RushHour[];
}

function RushHourIndicator({ tab }: RushHourIndicatorProps) {
  const [isAM, setIsAM] = useState(true);
  const [rushHourData, setRushHourData] = useState<RushHours | null>(null);
  const businessID = useManagerSelector(selectBusinessID);

  useEffect(() => {
    async function loadData() {
      if(!businessID) return;
      try {
        const [error, data] = await getRushHourData(businessID);
        if (!error) {
          console.log("Rush Hour Data:", data);
        } else {
          console.log("Error fetching rush hour data:", error);
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadData();
  }, [businessID]);

  return (
    <div className={styles.rushHourContainer}>
      <header className={styles.rushHourTitle}>
        <span className={styles.iconHolderRush}>
          <Image src={rushHourIcon} alt="Rush icon" width={12} height={12} />
        </span>
        <span className={styles.rushHourTitleText}>Rush Hours Indicator</span>
        <button
          className={styles.toggleButton}
          onClick={() => setIsAM(!isAM)}
          style={{ justifyContent: isAM ? 'flex-start' : 'flex-end' }}
        >
          <span className={styles.toggleButtonInner}>{isAM ? 'AM' : 'PM'}</span>
        </button>
      </header>

      <AMPMChart data={rushHourData?.[tab]} />

      <hr className={styles.hr} />
      <footer className={styles.rushTrendInfo}>
        <span className={styles.rushTrendRed}>
          <Image src={rushHourIcon} alt="Rush icon" width={12} height={12} />
        </span>
        <span className={styles.rushTrendHour}>0:00 {isAM ? 'AM' : 'PM'}</span>
        <span className={styles.rushTrendHourTo}>to</span>
        <span className={styles.rushTrendHour}>12:00 {isAM ? 'PM' : 'AM'}</span>
        <span className={styles.rushTrendText}>Peak Rush Hour <span className={styles.rushTrendTextSmall}>(Yesterday)</span></span>
      </footer>
    </div>
  );
}

export default RushHourIndicator;
