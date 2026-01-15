import React from 'react';
import styles from './AMPMChart.module.css';

type Bar = { time: string; pct: number; };

const bars: Bar[] = [
  { time: '00:00', pct: 8 },
  { time: '01:00', pct: 10 },
  { time: '02:00', pct: 12 },
  { time: '03:00', pct: 14 },
  { time: '04:00', pct: 18 },
  { time: '05:00', pct: 20 },
  { time: '06:00', pct: 22 },
  { time: '07:00', pct: 30, },
  { time: '08:00', pct: 80, },
  { time: '09:00', pct: 100, },
  { time: '10:00', pct: 60, },
  { time: '11:00', pct: 40, },
];

function barColor(pct: number) {
  if (pct < 20) {
    return 'primary-blue-black-1';
  }
  if (pct < 60) {
    return 'primary-green-black-3'
  }
  if (pct < 80) {
    return 'primary-green-black-1';
  }
  if (pct <= 100) {
    return 'bodytext-warning-red'
  }
}

function pctToHeight(pct: number, maxHeight = 150) {
  // maps 0-100 to pixel height
  return Math.round((pct / 100) * maxHeight);
}


export default function AMPMChart({ data }: any) {
  return (
    <div className={styles.container}>
      <div className={styles.chartTitle}>
        <p className={styles.capacity}>Capacity (%)</p>
        <div className={styles.peakRush}>
          <hr />
          <p>Peak Rush</p>
        </div>
      </div>
      <div className={styles.chartRow}>
        <div className={styles.capacityCol} aria-hidden>
          <div className='text-(--bodytext-warning-red)'>100 - </div>
          <div className='text-(--primary-green-black-1)'>80 - </div>
          <div className='text-(--primary-green-black-1)'>60 - </div>
          <div className='text-(--primary-green-black-3)'>40 - </div>
          <div className='text-(--primary-green-black-3)'>20 - </div>
          <div className='text-(--primary-blue-black-1)'>00 - </div>
        </div>

        <div className={styles.barsWrapper}>
          <div className={styles.barsRow}>
            {bars.map((b, i) => (
              <div
                key={i}
                className={styles.bar}
                style={{
                  height: `${pctToHeight(b.pct)}px`,
                  backgroundColor: `var(--${barColor(b.pct)})`
                }}
                title={`${b.time}: ${b.pct}%`}
                aria-label={`${b.time}: ${b.pct}%`}
              />
            ))}
          </div>
          <div className={styles.timeLabels}>
            <div>00:00</div>
            <div>01:00</div>
            <div>02:00</div>
            <div>03:00</div>
            <div>04:00</div>
            <div>05:00</div>
            <div>06:00</div>
            <div>07:00</div>
            <div>08:00</div>
            <div>09:00</div>
            <div>10:00</div>
            <div>11:00</div>
            <div>12:00</div>
          </div>
        </div>
      </div>
    </div>
  );
}