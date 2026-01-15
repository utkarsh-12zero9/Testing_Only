'use client';

import React from 'react';
import Image from 'next/image';
import styles from './FetchedPlanCard.module.css';
import PrimaryButton from '@/globalComponents/buttons/primaryButton/PrimaryButton';
import SecondaryButton from '@/globalComponents/buttons/secondaryButton/SecondaryButton';
import { useRouter } from 'next/navigation';
import { MembershipPlan } from '../../../types';

interface FetchedPlanCardProps {
    plan: MembershipPlan;
}

const FetchedPlanCard: React.FC<FetchedPlanCardProps> = ({ plan }) => {

    const router = useRouter();
    const planName = plan.name || plan.membershipName || plan.planName || 'Unnamed Plan';
    const membershipType = plan.membershipType || 'Unknown-Based';
    const totalPrice = plan.totalPrice || plan.planPrice || plan.sessionPrice || 0;

    const durationDetail = plan.durationDetails && plan.durationDetails.length > 0
        ? plan.durationDetails[0]
        : { period: plan.period || plan.duration || plan.validity || 0, periodPrice: totalPrice };

    const period = durationDetail.period || 0;
    const periodPrice = durationDetail.periodPrice || totalPrice;

    const participants = plan.participantsCount !== undefined ? plan.participantsCount : null;
    const capacity = plan.capacity !== undefined ? plan.capacity : null;

    const isPeriodBased = membershipType === 'Period-Based';

    const handleViewClick = () => {
        const planID = plan.ID || plan._id || plan.id;
        if (planID) {
            router.push(`/manager/plan/overview?planId=${planID}`);
        } else {
            console.error("Plan ID not found");
        }
    }

    return (
        <div className={`${styles.fetchedPlanCard} ${isPeriodBased ? styles.periodBased : styles.sessionBased}`}>
            <div className={styles.mainSection}>
                <div className={styles.iconContainer}>
                    <Image
                        src="/choosePlan/business.svg"
                        alt="Plan"
                        width={20}
                        height={20}
                        className={isPeriodBased ? styles.periodIcon : styles.sessionIcon}
                    />
                </div>

                <div className={styles.planContent}>
                    <div className={styles.membershipName}>{planName}</div>
                    <div className={styles.planType}>{membershipType} Plan</div>
                    <div className={styles.planDetails}>
                        <span className={styles.value}>
                            {membershipType === 'Period-Based'
                                ? period
                                : (plan.maxUsers || plan.sessionCount || period)}
                        </span>
                        <span className={styles.label}>
                            {membershipType === 'Period-Based' ? ' Days' : ' Sessions'}
                        </span>
                        {!isPeriodBased && (
                            <>
                                <span className={styles.detailDot}>•</span>
                                <span className={styles.value}>{period}</span>
                                <span className={styles.label}> Days Validity</span>
                            </>
                        )}
                        <span className={styles.detailDot}>•</span>
                        <span className={styles.label}>INR </span>
                        <span className={styles.value}>{periodPrice}</span>
                        <span className={styles.label}>
                            {isPeriodBased ? ' Per Plan' : ' Per Session'}
                        </span>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                Participants: <span className={styles.statValue}>{participants !== null ? participants : '01'}</span>
                            </div>
                            <span className={styles.separator}>|</span>
                            <div className={styles.statItem}>
                                Capacity : <span className={styles.statValue}>{capacity !== null ? capacity : '01'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {isPeriodBased ? (
                    <SecondaryButton
                        onClick={handleViewClick}
                        className={styles.secondaryViewButton}
                        colorVariant="transparent-white"
                    >
                        View
                    </SecondaryButton>
                ) : (
                    <PrimaryButton
                        onClick={handleViewClick}
                        colorVariant="primary-green"
                    >
                        View
                    </PrimaryButton>
                )}
            </div>
        </div>
    );
};

export default FetchedPlanCard;
