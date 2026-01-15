'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import HeaderManagerModule from '@/globalComponents/HeaderManager/ModuleHeader/ModuleHeader';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Heading from '@/globalComponents/Heading/Heading';
import BottomNav from '@/globalComponents/BottomNav/BottomNav';
import { usePathname, useRouter } from 'next/navigation';
import styles from './page.module.css';
import CreatePlanForm from './localComponents/CreatePlanForm/CreatePlanForm';
import { selectBusinessID } from '../../../../Redux/slice/business-slice';

export default function CreatePlanPage() {
    const pathname = usePathname();
    const router = useRouter();
    const [hasExistingPlans, setHasExistingPlans] = useState<boolean | null>(null);
    const businessIDFromRedux = useSelector(selectBusinessID);

    useEffect(() => {
        const fetchPlans = async () => {
            let businessID = businessIDFromRedux;
            if (!businessID) {
                businessID = localStorage.getItem('businessID') || undefined;
            }
            if (!businessID) {
                const businessData = localStorage.getItem('businessData');
                if (businessData) {
                    try {
                        const parsedData = JSON.parse(businessData);
                        businessID = parsedData.ID || parsedData.businessID || parsedData._id;
                    } catch (e) { }
                }
            }

            if (businessID) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/plan/getMembershipPlan?businessID=${businessID}`);
                    const result = await response.json();
                    const fetchedPlans = result?.data?.membershipPlans || result?.data || [];
                    setHasExistingPlans(Array.isArray(fetchedPlans) && fetchedPlans.length > 0);
                } catch (error) {
                    console.error('Error fetching plans in create page:', error);
                    setHasExistingPlans(false);
                }
            } else {
                setHasExistingPlans(false);
            }
        };
        fetchPlans();
    }, [businessIDFromRedux]);

    return (
        <div className={styles.container}>
            <div className={styles.containerWrapper}>
                <HeaderManagerModule moduleName='My Plan/Creation' />

                <div className={styles.mainArea}>
                    <Heading title="Create Your Plan" description="Design your Membership as you wish." />

                    <ProgressBar currentStep={1} />

                    <CreatePlanForm mode="create" />
                </div>

                <BottomNav pathname={pathname} />
            </div>
        </div>
    );
}