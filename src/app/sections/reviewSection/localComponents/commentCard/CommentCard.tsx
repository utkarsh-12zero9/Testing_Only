import styles from './CommentCard.module.css';
import { useState, useEffect } from 'react';

interface Review {
  customerName: string;
  planID: string;
  businessID: string;
  review?: string;
  issues?: string;
  rating: number;
  createdOn: string;
}

interface CommentCardProps {
  commentData: Review;
}

function CommentCard({ commentData }: CommentCardProps) {
  const [daysAgo, setDaysAgo] = useState(0);
  
  useEffect(() => {
    const createdDate = new Date(commentData.createdOn);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysAgo(diffDays);
  }, [commentData.createdOn]);
  
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= commentData.rating) {
        stars.push(<img key={i} src="/landingPageImages/reviewSection/star.svg" alt="filled star" />);
      } else {
        stars.push(<img key={i} src="/landingPageImages/reviewSection/emptyStar.svg" alt="empty star" />);
      }
    }
    return stars;
  };
  
  const commentText = commentData.review || commentData.issues || "No comment provided";
  
  return (
    <div className={styles.comment}>
      <div>
        <img src="/landingPageImages/reviewSection/girl.png" alt="Customer avatar" />
      </div>
      <div className={styles.text}>
        <div className={styles.rating}>
          <p>{commentData.rating.toFixed(1)}</p>
          <div>
            {renderStars()}
          </div>
        </div>
        <p className={styles.commentText}>{commentText}</p>
        <div className={styles.commentMetadata}>
          <p>{daysAgo} {daysAgo === 1 ? 'Day' : 'Days'} Ago</p>
          <h4>~ {commentData.customerName}</h4>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;