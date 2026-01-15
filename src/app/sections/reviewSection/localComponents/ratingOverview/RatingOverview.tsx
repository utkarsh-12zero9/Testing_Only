import getStarUnit from '@/lib/getStarUnit'
import styles from './RatingOverview.module.css'
import getColor from '@/lib/getColor'
function RatingOverview({reviewStatistics} : any) {

  return (
    <div className={styles.ratingOverview}>
        <div className={styles.ratingOverviewLeft}>

                <h4>Total Reviews</h4>
                <div className={styles.count}>
                    <h1>{reviewStatistics?.totalReviews}</h1>
                    <p>Count</p>
                </div>
                <hr className={styles.divider}/>

                <div className={styles.trendInfo}>
                    <div className=''>

                    </div>
                    <div className={styles.textInfo}>
                        <span>{reviewStatistics?.percentChange.totalReviews}%</span>
                        <p>vs last 7 days Avg.</p>
                    </div>
                </div>

        </div>

        <hr className={styles.verticalDivider}/>

        <div className={styles.ratingOverviewRight}>

                <h4>Average Rating</h4>
                <div className={styles.count}>
                    <h1 style={{
                        color : getColor(reviewStatistics?.averageRating),
                    }}>{reviewStatistics?.averageRating}</h1>
                    <img src={getStarUnit(reviewStatistics?.averageRating - 1, "mini")} alt="" height={"20px"} width={"20px"} />
                </div>
                <hr className={styles.divider}/>

                <div className={styles.trendInfo}>
                    <div className=''>

                    </div>
                    <div className={styles.textInfo}>
                        <span>{reviewStatistics?.percentChange.averageRating}%</span>
                        <p>vs last 7 days Avg.</p>
                    </div>
                </div>

        </div>
    </div>
  )
}

export default RatingOverview