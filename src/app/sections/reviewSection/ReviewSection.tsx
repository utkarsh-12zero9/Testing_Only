import { useAppSelector } from '@/app/Redux/hooks'
import CommentCard from './localComponents/commentCard/CommentCard'
import RatingMeter from './localComponents/ratingMeter/RatingMeter'
import RatingOverview from './localComponents/ratingOverview/RatingOverview'
import styles from './ReviewSection.module.css'
import { selectReviews, selectReviewsStatistics } from '@/app/Redux/slice/businessSlice/ReviewData'
import React from 'react'
import { getTopReviews } from '@/lib/sortReviews'

function ReviewSection() {
    const reviewStatistics = useAppSelector(selectReviewsStatistics);
    const reviews = useAppSelector(selectReviews) || [];
    const sortedReviews = getTopReviews(reviews);

    const list = sortedReviews?.map((item, index) => (
        <React.Fragment key={index}>
            <CommentCard commentData={item}/>
        </React.Fragment>
    ));
  return (
    <div className={styles.reviewSection} style={{
        background: "url('/landingPageImages/reviewSection/main.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }}>
        <div className={styles.overlay}>
            <div className={styles.reviewSectionTitle}>
                <h1>Reviews</h1>
                <p>Know More About Us</p>
            </div>

            <hr className={styles.divider}/>

            <div className={styles.reviewContainer}>
                <div className={styles.reviewMetadata}> 
                    <RatingOverview reviewStatistics={reviewStatistics}/>

                    <hr className={styles.divider}/>

                    <RatingMeter ratingCounts={reviewStatistics?.ratingCounts} totalReview = {reviewStatistics?.totalReviews}/>
                </div>

                <hr className={styles.verticalDivider}/>

                <div className={styles.commentsContainer}>
                <h4>Comments</h4>
                <div className={styles.comments}>
                    {list}
                </div>
                    </div>
            </div>
        </div>
    </div>
  )
}



export default ReviewSection