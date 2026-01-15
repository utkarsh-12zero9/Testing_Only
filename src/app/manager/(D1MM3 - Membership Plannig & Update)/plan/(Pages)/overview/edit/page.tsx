'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import HeaderManagerModule from '@/globalComponents/HeaderManager/ModuleHeader/ModuleHeader';
import Heading from '@/globalComponents/Heading/Heading';
import BottomNav from '@/globalComponents/BottomNav/BottomNav';
import LoadingPage from '@/globalComponents/LoadingPage/LoadingPage';
import CommonPopup from '@/globalComponents/Popups/Common/CommonPopup';
import CreatePlanForm from '../../create/localComponents/CreatePlanForm/CreatePlanForm';
import { getMembershipPlanById, updateMembershipPlan } from '../../../services/membershipService';
import { invalidatePlansCache } from '../../../utils/cacheUtils';

import styles from './page.module.css';

export default function EditPlanPage() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [planData, setPlanData] = useState<any>(null);
    const [planID, setPlanID] = useState<string | null>(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPriceChangePopup, setShowPriceChangePopup] = useState(false);
    const [pendingFormData, setPendingFormData] = useState<any>(null);

    useEffect(() => {
        const fetchPlanDetails = async () => {
            const planIdFromParams = searchParams.get('planId');
            if (!planIdFromParams) {
                console.error("No planID found in query params");
                alert("No plan selected. Redirecting to overview.");
                router.push('/manager/plan');
                return;
            }

            setPlanID(planIdFromParams);

            try {
                console.log("Fetching plan details for planID:", planIdFromParams);
                const response = await getMembershipPlanById(planIdFromParams);

                if (response && response.data && response.data.membershipPlans && response.data.membershipPlans.length > 0) {
                    const plan = response.data.membershipPlans[0];
                    console.log("Retrieved plan from API:", plan);
                    setPlanData(plan);
                    setIsLoading(false);
                } else {
                    console.error("No plan data in response");
                    router.push('/manager/plan');
                }
            } catch (error) {
                console.error("Error fetching plan details:", error);
                router.push('/manager/plan');
            }
        };

        fetchPlanDetails();
    }, [router, searchParams]);

    const handleSubmit = async (formData: any) => {
        if (!planID) {
            alert('Plan ID not found');
            return;
        }

        // Check if price has changed
        const originalDurationDetails = planData.durationDetails || {};
        const isPeriodBased = planData.membershipType === 'Period-Based';

        let priceChanged = false;
        if (isPeriodBased) {
            const originalPrice = originalDurationDetails.periodPrice || 0;
            const newPrice = formData.planPrice || 0;
            priceChanged = Number(originalPrice) !== Number(newPrice);
        } else {
            const originalPrice = originalDurationDetails.sessionPrice || 0;
            const newPrice = formData.sessionPrice || 0;
            priceChanged = Number(originalPrice) !== Number(newPrice);
        }

        // If price changed, show acknowledgement popup
        if (priceChanged) {
            setPendingFormData(formData);
            setShowPriceChangePopup(true);
            return;
        }

        await submitUpdate(formData, false);
    };

    const submitUpdate = async (formData: any, priceChangeAcknowledged: boolean) => {
        if (!planID) return;

        setIsLoading(true);
        try {
            const payload = {
                ...formData,
                ...(priceChangeAcknowledged && { priceChangeAcknowledged: true })
            };

            console.log('Updating Membership Plan Data:', JSON.stringify(payload, null, 2));

            const response = await updateMembershipPlan(planID, payload);
            console.log('Update Plan API Response:', response);

            if (response.success) {
                // Invalidate plans cache to force fresh fetch
                invalidatePlansCache();

                setShowSuccessPopup(true);
                const updatedResponse = await getMembershipPlanById(planID);
                if (updatedResponse && updatedResponse.data && updatedResponse.data.membershipPlans && updatedResponse.data.membershipPlans.length > 0) {
                    setPlanData(updatedResponse.data.membershipPlans[0]);
                }
            } else {
                setErrorMessage(response.message || 'Failed to update plan');
                setShowErrorPopup(true);
            }
        } catch (error: any) {
            console.error('Error updating plan:', error);
            setErrorMessage(error?.data?.message || 'An error occurred while updating the plan');
            setShowErrorPopup(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmPriceChange = () => {
        setShowPriceChangePopup(false);
        if (pendingFormData) {
            submitUpdate(pendingFormData, true);
            setPendingFormData(null);
        }
    };

    const handleCancelPriceChange = () => {
        setShowPriceChangePopup(false);
        setPendingFormData(null);
    };

    const handleCloseSuccessPopup = () => {
        setShowSuccessPopup(false);
        router.push('/manager/plan/overview');
    };

    const handleCloseErrorPopup = () => {
        setShowErrorPopup(false);
    };

    if (isLoading || !planData) {
        return <LoadingPage />;
    }

    return (
        <div className={styles.container}>
            {isLoading && <LoadingPage />}
            <div className={styles.containerWrapper}>
                <HeaderManagerModule moduleName='My Plan/Update' />

                <div className={styles.mainArea}>
                    <Heading title="Update Your Plan" description="Design your Membership as you wish." />

                    <CreatePlanForm
                        onSubmit={handleSubmit}
                        mode="edit"
                        initialData={planData}
                        planID={planID || undefined}
                    />
                </div>

                <BottomNav pathname={pathname} />
            </div>

            {/* Success Popup */}
            {showSuccessPopup && (
                <CommonPopup
                    variant="success"
                    title="Update Successful!"
                    buttonText="Done"
                    onClick={handleCloseSuccessPopup}
                    onOutsideClick={handleCloseSuccessPopup}
                    className={styles.customPopup}
                >
                    Congratulations! Your Details has been updated.
                </CommonPopup>
            )}

            {/* Error Popup */}
            {showErrorPopup && (
                <CommonPopup
                    variant="warning"
                    title="Update Failed"
                    buttonText="Try Again"
                    onClick={handleCloseErrorPopup}
                    onOutsideClick={handleCloseErrorPopup}
                    className={styles.customPopup}
                >
                    {errorMessage}
                </CommonPopup>
            )}

            {/* Price Change Acknowledgement Popup */}
            {showPriceChangePopup && (
                <CommonPopup
                    variant="warning"
                    title="Price Change Detected"
                    buttonText="Confirm & Update"
                    onClick={handleConfirmPriceChange}
                    onOutsideClick={handleCancelPriceChange}
                    className={styles.customPopup}
                >
                    You are changing the plan price. This change will affect all future subscriptions. Are you sure you want to proceed?
                </CommonPopup>
            )}
        </div>
    );
}
