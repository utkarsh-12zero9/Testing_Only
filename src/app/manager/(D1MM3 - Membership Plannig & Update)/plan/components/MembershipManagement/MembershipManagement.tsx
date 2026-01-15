'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useMemo, useCallback } from 'react';
import styles from './MembershipManagement.module.css';
import LockedSlotPopup from '../../(Pages)/become-a-coach/localComponents/LockedSlotPopup/LockedSlotPopup';
import FetchedPlanCard from './FetchedPlanCard/FetchedPlanCard';

interface MembershipManagementProps {
    maxSlots?: number;
    plans: any[]; // Plans passed from parent
}

// Constant moved outside component
const LOCKED_SLOTS = 4;

const MembershipManagement: React.FC<MembershipManagementProps> = ({
    maxSlots = 10,
    plans
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const router = useRouter();

    const handleCardClick = useCallback(() => {
        setIsPopupOpen(true);
    }, []);

    const handleAddPlanClick = useCallback(() => {
        router.push('/manager/plan/create');
    }, [router]);

    const handleClosePopup = useCallback(() => {
        setIsPopupOpen(false);
    }, []);

    // Memoize calculated slot values
    const filledSlots = useMemo(() => plans.length, [plans.length]);
    const availableSlots = useMemo(() => Math.max(0, maxSlots - filledSlots), [maxSlots, filledSlots]);

    const handleBuyNow = useCallback(() => {
        setIsPopupOpen(false);
        // Buy logic to be added yet
    }, []);

    return (
        <>
            <div className={styles.container}>
                <h3 className={styles.title}>Your Membership Plans</h3>
                <div className={styles.divider}></div>
                <div className={styles.plansGrid}>
                    {plans.map((membership, index) => (
                        <FetchedPlanCard key={membership.id || membership._id || index} plan={membership} />
                    ))}

                    {Array.from({ length: availableSlots }).map((_, index) => (
                        <div key={`add-${index}`} className={styles.planBox} onClick={handleAddPlanClick}>
                            <button className={styles.addButton}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5V19M5 12H19" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                    ))}

                    {Array.from({ length: LOCKED_SLOTS }).map((_, index) => (
                        <div key={`locked-${index}`} className={styles.planCard} onClick={handleCardClick}>
                            <div className={styles.lockIcon}>
                                <img src="/plan/lockIcon.svg" alt="Locked Plan" width="24" height="24" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <LockedSlotPopup isOpen={isPopupOpen} onClose={handleClosePopup} onBuyNow={handleBuyNow} />
        </>
    )
}

export default MembershipManagement;