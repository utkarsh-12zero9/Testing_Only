'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import HeaderManagerModule from '@/globalComponents/HeaderManager/ModuleHeader/ModuleHeader';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Heading from '@/globalComponents/Heading/Heading';
import BottomNav from '@/globalComponents/BottomNav/BottomNav';
import { selectBusinessID } from '../../../../Redux/slice/business-slice';
import PayoutSummary from './localComponents/PayoutSummary/PayoutSummary';
import styles from './page.module.css';

export default function PayoutOverviewPage() {
    const pathname = usePathname();
    const router = useRouter();
    const businessID = useSelector(selectBusinessID);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPayout, setTotalPayout] = useState(0);
    const [totalPlanCharges, setTotalPlanCharges] = useState(100);

    useEffect(() => {
        const fetchPayoutData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Replace with actual API call
                // const response = await fetch('/api/payout-data');
                // const data = await response.json();
                // setTotalPayout(data.totalPayout);
                // setTotalPlanCharges(data.totalPlanCharges);

                // Temporary: Using dummy data
                setTotalPayout(0);
                setTotalPlanCharges(100);
            } catch (err) {
                console.error('Error fetching payout data:', err);
                setError('Failed to load payout information');
            } finally {
                setLoading(false);
            }
        };

        // fetchPayoutData();
    }, [businessID]);

    const handleEdit = () => {
        console.log('Edit clicked');
    };

    const handleAccept = () => {
        // Navigate to overview page for final plan preview (step 4)
        router.push("/manager/plan/overview");
    };

    return (
        <div className={styles.container}>
            <div className={styles.containerWrapper}>
                {/* Header Manager */}
                <HeaderManagerModule moduleName='My Plan/Creation' />

                {/* Main Area */}
                <div className={styles.mainArea}>
                    {/* Headings */}
                    <Heading
                        title="Pay-out Overview"
                        description="Confirm your plan charges & pay-outs."
                    />

                    {/* Progress Bar */}
                    <ProgressBar currentStep={3} />

                    {/* Payout Container */}
                    <div className={styles.payoutContainer}>
                        <PayoutSummary
                            totalPayout={totalPayout}
                            totalPlanCharges={totalPlanCharges}
                            onEdit={handleEdit}
                            onAccept={handleAccept}
                        />
                    </div>
                </div>

                {/* Footer Nav Bar */}
                <BottomNav pathname={pathname} />
            </div>
        </div>
    );
}
