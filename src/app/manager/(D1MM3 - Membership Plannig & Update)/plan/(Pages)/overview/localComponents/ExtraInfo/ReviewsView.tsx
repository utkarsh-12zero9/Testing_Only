import React from 'react';
import { TrendingUp } from 'lucide-react';
import Image from 'next/image';
import styles from './ExtraInfo.module.css';
import { ReviewCardProps } from '../../../../types';

const ReviewCard = ({ name, date, rating, comment, avatar }: ReviewCardProps) => (
    <div className={styles.reviewCard}>
        <div className={styles.reviewHeader}>
            <div className={styles.reviewerAvatar}>
                <Image src={avatar || "/plan/Male.svg"} alt={name} width={40} height={40} className={styles.avatarImg} />
            </div>
            <div className={styles.reviewerInfo}>
                <div className={styles.ratingRow}>
                    <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
                    <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                            <Image
                                key={i}
                                src="/reviewIcons/star-unit-small.svg"
                                alt="star"
                                width={14}
                                height={14}
                                style={{ opacity: i < Math.floor(rating) ? 1 : 0.3 }}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.reviewMeta}>
                    <span className={styles.reviewDate}>{date}</span>
                    <span className={styles.reviewerName}>~ {name}</span>
                </div>
            </div>
        </div>
        <p className={styles.reviewComment}>{comment}</p>
    </div>
);

interface ReviewsViewProps {
    avgRating?: number;
    totalReviews?: number;
}

export default function ReviewsView({ avgRating = 0, totalReviews = 0 }: ReviewsViewProps) {
    // Dummy data    
    const ratings = [
        { stars: 5, count: 86 },
        { stars: 4, count: 233 },
        { stars: 3, count: 369 },
        { stars: 2, count: 26 },
        { stars: 1, count: 65 },
    ];

    const maxCount = Math.max(...ratings.map(r => r.count));
    const ratingsWithPercent = ratings.map(r => ({
        ...r, percent: Math.round((r.count / maxCount) * 100),
    }));

    const getRatingColor = (rating: number) => {
        const roundedRating = Math.round(rating);
        if (roundedRating <= 2) return 'var(--warning-red)';
        if (roundedRating <= 4) return 'var(--primary-blue)';
        return 'var(--primary-green)';
    };

    const getStarIcon = (rating: number, shouldRound: boolean = false) => {
        const value = shouldRound ? Math.round(rating) : rating;
        switch (value) {
            case 1: return '/reviewIcons/mini/star0.svg';
            case 2: return '/reviewIcons/mini/star25.svg';
            case 3: return '/reviewIcons/mini/star50.svg';
            case 4: return '/reviewIcons/mini/star75.svg';
            case 5: return '/reviewIcons/mini/star100.svg';
            default: return '/reviewIcons/mini/star0.svg';
        }
    };

    const reviews = [
        {
            name: "User name",
            date: "28 Day Ago",
            rating: 4.0,
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim...",
            avatar: "/plan/Male.svg"
        },
        {
            name: "Another User",
            date: "1 Month Ago",
            rating: 4.5,
            comment: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            avatar: "/plan/Male.svg"
        }
    ];

    return (
        <div className={styles.viewContainer}>
            <div className={styles.statsRow}>
                <div className={styles.statCard}>
                    <div className={styles.statSection}>
                        <span className={styles.statLabel}>Total Reviews</span>
                        <div className={styles.statMain}>
                            <span className={styles.statValue} style={{ color: "var(--primary-green)" }}>{totalReviews}</span>
                            <span className={styles.statUnit}>Count</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.trendRow}>
                            <TrendingUp size={12} color="var(--primary-green)" />
                            <span className={styles.trendValue}>2.1%</span>
                            <span className={styles.trendLabel}>vs last 7 days Avg.</span>
                        </div>
                    </div>
                    <div className={styles.verticalDivider}></div>
                    <div className={styles.statSection}>
                        <span className={styles.statLabel}>Average Rating</span>
                        <div className={styles.statMain}>
                            <span className={styles.statValue} style={{ color: getRatingColor(avgRating) }}>{avgRating.toFixed(1)}</span>
                            <span style={{ color: getRatingColor(avgRating), display: 'flex', alignItems: 'center' }}>
                                <Image
                                    src={getStarIcon(avgRating, true)}
                                    alt="star"
                                    width={20}
                                    height={20}
                                />
                            </span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.trendRow}>
                            <TrendingUp size={12} color="var(--primary-green)" />
                            <span className={styles.trendValue}>2.1%</span>
                            <span className={styles.trendLabel}>vs last 7 days Avg.</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.ratingsCard}>
                <h3 className={styles.sectionTitle}>Ratings</h3>
                <div className={styles.histogram}>
                    {ratingsWithPercent.map((r) => (
                        <div key={r.stars} className={styles.histoRow}>
                            <span className={styles.histoStar}>
                                {r.stars}
                                <Image
                                    src={getStarIcon(r.stars)}
                                    alt="star"
                                    width={12}
                                    height={12}
                                />
                            </span>
                            <div className={styles.histoBarContainer}>
                                <div
                                    className={styles.histoBar}
                                    style={{
                                        width: `${r.percent}%`,
                                        background: r.stars === 5 ? 'var(--primary-green)' : (r.stars >= 3 ? 'var(--primary-blue)' : 'var(--warning-red)')
                                    }}
                                />
                            </div>
                            <span className={styles.histoCount}>{r.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.reviewsList}>
                {reviews.map((rev, i) => (
                    <ReviewCard key={i} {...rev} />
                ))}
            </div>
        </div>
    );
}