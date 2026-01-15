import getStarUnit from "@/lib/getStarUnit";
import styles from "./RatingMeter.module.css";
import RatingBar from "../ratingBar/RatingBar";

interface RatingCounts {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

interface RatingMeterProps {
  ratingCounts?: RatingCounts;
  totalReview?: number;
}

function RatingMeter({ ratingCounts, totalReview = 0 }: RatingMeterProps) {
  if (!ratingCounts) {
    return <div className={styles.ratingMeter}>Loading ratings...</div>;
  }

  const getPercentage = (count: number) => {
    if (!totalReview || totalReview === 0) return 0;
    return Math.round((count / totalReview) * 100);
  };

  const list = [4, 3, 2, 1, 0].map((item) => {
    const actualRating = item + 1;
    const ratingKey = actualRating.toString() as keyof RatingCounts;
    const count = ratingCounts[ratingKey] || 0;
    const percentage = getPercentage(count);
    
    return (
      <div key={item} className={styles.individualMeter}>
        <div className={styles.rating}>
          <p>{actualRating}</p>
          <img src={getStarUnit(item, "mini")} alt="rating star" />
        </div>
        <hr className={styles.verticalDivider}/>
        <div className={styles.count}>
          <RatingBar property={item} percentage={percentage}/>
        </div>
        {count}
      </div>
    );
  });

  return (
    <div className={styles.ratingMeter}>
      <p>Rating</p>
      {list}
    </div>
  );
}

export default RatingMeter;