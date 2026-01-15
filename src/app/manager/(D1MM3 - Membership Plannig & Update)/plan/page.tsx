'use client';
import HeaderManagerModule from '@/globalComponents/HeaderManager/ModuleHeader/ModuleHeader';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMembershipPlans } from './services/membershipService';
import LoadingPage from '@/globalComponents/LoadingPage/LoadingPage';
import styles from './page.module.css';
import Heading from './components/Heading/Heading';
import Container from './components/Container/Container';
import SubscriptionPlan from './components/SubscriptionPlan/SubscriptionPlan';
import MembershipManagement from './components/MembershipManagement/MembershipManagement';
import BottomNav from '@/globalComponents/BottomNav/BottomNav';

export default function Page() {

    const pathname = usePathname();
    const router = useRouter();

    const [plans, setPlans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const businessData = JSON.parse(localStorage.getItem("businessData") || "{}");
        const businessID = businessData?.ID;

        async function checkPlans() {
            if (!businessID) {
                setLoading(false);
                return;
            }

            try {
                const cacheKey = `membershipPlans_${businessID}`;
                const sessionKey = `plansFetched_${businessID}`;

                // Check if plans were already fetched in this session
                const sessionFetched = sessionStorage.getItem(sessionKey);

                if (sessionFetched) {
                    // Use cached plans from localStorage
                    const cachedDataStr = localStorage.getItem(cacheKey);

                    if (cachedDataStr) {
                        try {
                            // Parse cached data for plans
                            const cachedData = JSON.parse(cachedDataStr);
                            const cachedPlans = cachedData.plans || [];
                            setPlans(cachedPlans);

                            if (Array.isArray(cachedPlans) && cachedPlans.length === 0) {
                                router.push("/manager/plan/create");
                            }
                            setLoading(false);
                            return;
                        } catch (error) {
                            console.error('Error parsing cached plans:', error);
                            // Continue to fetch from API
                        }
                    }
                }

                // First load in session or cache invalid - fetch from API
                console.log('🔄 Fetching fresh plans from backend...');
                const res = await getMembershipPlans(businessID);

                if (!res?.data?.membershipPlans) {
                    console.log("❌ Failed to fetch plans.");
                    return;
                }

                const fetchedPlans = res?.data?.membershipPlans || res?.data || [];

                // Save to localStorage
                const cacheData = {
                    plans: fetchedPlans,
                    timestamp: Date.now(),
                    businessID
                };
                localStorage.setItem(cacheKey, JSON.stringify(cacheData));

                // Mark as fetched in this session
                sessionStorage.setItem(sessionKey, 'true');

                setPlans(fetchedPlans);

                if (Array.isArray(fetchedPlans) && fetchedPlans.length === 0) {
                    router.push("/manager/plan/create");
                }
            } catch (err) {
                console.error("Error fetching plans:", err);
            } finally {
                setLoading(false);
            }
        }

        checkPlans();
    }, [router]);

    if (loading || plans.length === 0) {
        return <LoadingPage />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerWrapper}>
                <HeaderManagerModule moduleName='My Plan' />

                <div className={styles.mainArea}>
                    <div className="w-full flex justify-center">
                        <Heading description="Design your Membership as you wish." />
                    </div>

                    <Container />

                    <SubscriptionPlan />

                    <hr className={styles.line} />

                    <MembershipManagement maxSlots={6} plans={plans} />

                </div>

                <BottomNav pathname={pathname} />
            </div>
        </div>
    )
}