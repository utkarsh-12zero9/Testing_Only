import styles from './RatingBar.module.css';

interface RatingBarProps {
  property: number;
  percentage: number;
}

function RatingBar({ property, percentage }: RatingBarProps) {
  return (
    <div className={styles.ratingBar}>
      <div 
        className={styles.inner} 
        style={{
          width: `${percentage}%`,
          backgroundColor: percentage >= 75 
            ? "var(--bodytext-primary-green)" 
            : percentage >= 50 
              ? "var(--bodytext-primary-blue)" 
              : "var(--bodytext-warning-red)"
        }}
      />
    </div>
  );
}

export default RatingBar;