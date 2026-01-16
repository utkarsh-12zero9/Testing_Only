'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import styles from './page.module.css';
import HeaderManagerModule from '@/globalComponents/HeaderManager/ModuleHeader/ModuleHeader';
import { deletePlan, getMembershipPlanById } from '../../services/membershipService';
import { invalidatePlansCache } from '../../utils/cacheUtils';

import Heading from '@/globalComponents/Heading/Heading';
import ModalDivider from '@/globalComponents/modal/ModalDivider';
import Image from 'next/image';
import { Trash2, Pencil } from 'lucide-react';
import PrimaryButton from '@/globalComponents/buttons/primaryButton/PrimaryButton';
import SecondaryButton from '@/globalComponents/buttons/secondaryButton/SecondaryButton';
import TabNav from '@/globalComponents/TabNav/TabNav';
import BottomNav from '@/globalComponents/BottomNav/BottomNav';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { selectBusinessID } from '../../../../Redux/slice/business-slice';

// Local Components
import ReviewsView from './localComponents/ExtraInfo/ReviewsView';
import TrainersView from './localComponents/ExtraInfo/TrainersView';
import TagsView from './localComponents/ExtraInfo/TagsView';
import InfoElement from './localComponents/InfoElement/InfoElement';
import LoadingPage from '@/globalComponents/LoadingPage/LoadingPage';
import PlanActionPopup from '../../components/PlanActionPopup/PlanActionPopup';
import SharePopup from './localComponents/SharePopup/SharePopup';

const OverviewContent = () => {
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [activeTab, setActiveTab] = useState(0);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [isFinalPlanOverview, setIsFinalPlanOverview] = useState(false);
    const [isCreationMode, setIsCreationMode] = useState(false);
    const [showSaveSuccessPopup, setShowSaveSuccessPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const activePathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const tabs = ['Reviews', 'Trainers', 'Key Features', 'Objective'];

    useEffect(() => {
        const fetchPlanDetails = async () => {
            // First check if this is a new plan creation flow (createFormData exists)
            const createFormDataStr = localStorage.getItem('createFormData');

            if (createFormDataStr) {
                // New plan creation flow - show preview from localStorage
                try {
                    const formData = JSON.parse(createFormDataStr);

                    // Transform form data to plan preview format
                    const previewPlan = {
                        name: formData.membershipName,
                        membershipName: formData.membershipName,
                        membershipType: formData.membershipType,
                        membershipObjective: formData.membershipObjective,
                        objective: formData.membershipObjective,
                        keyFeatures: formData.keyFeatures,
                        durationDetails: formData.membershipType === 'Period-Based' ? {
                            period: formData.period,
                            periodPrice: formData.planPrice
                        } : {
                            sessionCount: formData.sessionCount,
                            sessionPrice: formData.sessionPrice,
                            validity: formData.validity
                        },
                        avgRating: 0,
                        totalReviews: 0
                    };

                    setSelectedPlan(previewPlan);
                    setIsFinalPlanOverview(true);
                    setIsCreationMode(true);
                    return;
                } catch (error) {
                    console.error('Error parsing createFormData:', error);
                    localStorage.removeItem('createFormData');
                }
            }

            // Check for final plan overview (after plan is created)
            const finalPlanData = localStorage.getItem('finalPlanOverviewPlan');

            if (finalPlanData) {
                // Final plan preview mode
                try {
                    const planData = JSON.parse(finalPlanData);
                    setSelectedPlan(planData);
                    setIsFinalPlanOverview(true);
                    setIsCreationMode(true);
                    return;
                } catch (error) {
                    console.error('Error parsing final plan data:', error);
                    localStorage.removeItem('finalPlanOverviewPlan');
                }
            }

            // Normal plan overview mode (existing plan)
            const planID = searchParams.get('planId');
            if (!planID) {
                console.error("No planID found.");
                router.push('/manager/plan');
                return;
            }

            try {
                const response = await getMembershipPlanById(planID);

                if (response && response.data && response.data.membershipPlans && response.data.membershipPlans.length > 0) {
                    const planData = response.data.membershipPlans[0];
                    setSelectedPlan(planData);
                    setIsFinalPlanOverview(false);
                    setIsCreationMode(false);
                } else {
                    console.error("No plan data in response");
                    alert("Plan not found. Redirecting to plans page.");
                    router.push('/manager/plan');
                }
            } catch (error) {
                console.error("Error fetching plan details:", error);
                alert("Failed to load plan details. Redirecting to plans page.");
                router.push('/manager/plan');
            }
        };

        fetchPlanDetails();
    }, [router, searchParams]);

    const handleDeleteClick = () => {
        setShowDeletePopup(true);
    };

    const handleEditClick = () => {
        setShowEditPopup(true);
    };

    const handleShareClick = () => {
        setShowSharePopup(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedPlan) return;

        const planID = selectedPlan.ID || selectedPlan._id || selectedPlan.id;
        if (!planID) {
            alert("Cannot find Plan ID for deletion.");
            return;
        }

        try {
            const res = await deletePlan(planID);
            console.log("Delete Plan Response:", res);

            if (res.success) {
                // Invalidate plans cache to force fresh fetch
                invalidatePlansCache();

                setShowDeletePopup(false);
                router.push('/manager/plan');
            } else {
                alert(res.message || "Failed to delete plan.");
            }
        } catch (error) {
            console.error("Error deleting plan:", error);
            alert("An error occurred while deleting the plan.");
        }
    };

    const handleConfirmEdit = () => {
        setShowEditPopup(false);
        const planID = selectedPlan.ID || selectedPlan._id || selectedPlan.id;
        router.push(`/manager/plan/overview/edit?planId=${planID}`);
    };

    const handleEditPlan = () => {
        if (isFinalPlanOverview) {
            const planID = selectedPlan.ID || selectedPlan._id || selectedPlan.id;
            if (planID) {
                router.push(`/manager/plan/overview/edit?planId=${planID}`);
            }
        }
    };

    const handleSavePlan = async () => {
        if (isFinalPlanOverview) {
            // Plan is already created in CreatePlanForm, just clean up and show success

            // Invalidate plans cache to ensure fresh data
            invalidatePlansCache();

            // Clean up temporary form data
            localStorage.removeItem('createFormData');

            // Show success popup
            setShowSaveSuccessPopup(true);
        }
    };

    const handleSaveSuccessClose = () => {
        setShowSaveSuccessPopup(false);
        // Clean up any remaining temporary data
        localStorage.removeItem('finalPlanOverviewPlan');
        localStorage.removeItem('lastCreatedPlanID');
        router.push('/manager/plan');
    };

    if (!selectedPlan) {
        return <LoadingPage />;
    }

    const planName = selectedPlan.name || selectedPlan.membershipName || selectedPlan.planName || 'Unnamed Plan';
    const membershipType = selectedPlan.membershipType || 'Unknown-Based';
    const isPeriodBased = membershipType === 'Period-Based';

    const durationDetails = selectedPlan.durationDetails || {};

    const period = isPeriodBased ? (durationDetails.period || 0) : (durationDetails.validity || 0);
    const sessionCount = durationDetails.sessionCount || 0;
    const price = isPeriodBased ? (durationDetails.periodPrice || 0) : (durationDetails.sessionPrice || 0);

    // Define info data based on membership type
    const infoData = isPeriodBased
        ? [
            { value: period, unit: 'Days', label: 'Validity' },
            { value: price, unit: 'INR', label: 'Per Plan' }
        ]
        : [
            { value: sessionCount, unit: 'Count', label: 'Sessions' },
            { value: period, unit: 'Days', label: 'Validity' },
            { value: price, unit: 'INR', label: 'Per Session' }
        ];

    return (
        <div className={styles.container}>
            {isLoading && <LoadingPage />}
            <div className={styles.containerWrapper}>
                <div className={styles.headerWrapper}>
                    <HeaderManagerModule moduleName='My Plan/Overview' />
                </div>

                <main className={styles.mainArea}>

                    <Heading
                        title="Plan Overview"
                        description={isCreationMode ? "Confirm everything one last time" : "Gym/Fitness Centre"}
                    />

                    {isCreationMode && <ProgressBar currentStep={4} />}

                    <div className={styles.membershipDetails}>
                        {/* Plan Name Tab */}
                        <div className={styles.planOverviewTab}>
                            <div className={styles.planIconContainer}>
                                <Image
                                    src="/choosePlan/business.svg"
                                    alt="Plan Icon"
                                    width={16}
                                    height={16}
                                    style={{ filter: 'brightness(0)' }}
                                />
                            </div>
                            <div className={styles.planInfoBox}>
                                <h2 className={styles.membershipName}>{planName}</h2>
                                <p className={styles.planTypeName}>{membershipType} Plan</p>
                            </div>
                        </div>

                        {/* CTA Container - Only show for normal plan overview */}
                        {!isFinalPlanOverview && (
                            <div className={styles.CTAcontainer}>
                                <button
                                    className={styles.deleteIconButton}
                                    onClick={handleDeleteClick}
                                    title="Delete Plan"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <SecondaryButton
                                    onClick={handleEditClick}
                                    className={styles.editButtonOverride}
                                    colorVariant="primary-blue"
                                >
                                    <Pencil size={16} /> Edit
                                </SecondaryButton>
                                <PrimaryButton
                                    onClick={handleShareClick}
                                    className={styles.shareButtonOverride}
                                    colorVariant="primary-green"
                                >
                                    Share
                                </PrimaryButton>
                            </div>
                        )}

                        {/* Additional Info */}
                        <div className={styles.additionalInfo}>
                            {infoData.map((info, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && <div className={styles.verticalDivider}></div>}
                                    <InfoElement
                                        value={info.value}
                                        unit={info.unit}
                                        label={info.label}
                                    />
                                </React.Fragment>
                            ))}
                        </div>

                        <div className={styles.divider}>
                            <ModalDivider />
                        </div>

                        {/* Extra Info */}
                        <div className={styles.extraInfo}>
                            <TabNav
                                tabs={tabs}
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                            />

                            <div className={styles.activeViewContainer}>
                                {activeTab === 0 && <ReviewsView avgRating={selectedPlan.avgRating} totalReviews={selectedPlan.totalReviews} />}
                                {activeTab === 1 && <TrainersView />}
                                {activeTab === 2 && <TagsView tags={selectedPlan.keyFeatures || ["Strength Training"]} />}
                                {activeTab === 3 && <TagsView tags={selectedPlan.objective || ["Fat Loss"]} />}
                            </div>
                        </div>

                        {/* Final Plan Overview CTAs - Edit and Save Plan */}
                        {isCreationMode && (
                            <div className={styles.finalPlanCTAContainer}>
                                <SecondaryButton
                                    onClick={handleEditPlan}
                                    colorVariant="primary-blue"
                                    className={styles.editPlanButton}
                                >
                                    Edit
                                </SecondaryButton>
                                <PrimaryButton
                                    onClick={handleSavePlan}
                                    colorVariant="primary-green"
                                    className={styles.savePlanButton}
                                >
                                    Save Plan
                                </PrimaryButton>
                            </div>
                        )}
                    </div>
                </main>



                <BottomNav pathname={activePathname} />

                {/* Delete Popup */}
                <PlanActionPopup
                    isOpen={showDeletePopup}
                    onClose={() => setShowDeletePopup(false)}
                    onConfirm={handleConfirmDelete}
                    mode="delete"
                    planName={planName}
                />

                {/* Edit Popup */}
                <PlanActionPopup
                    isOpen={showEditPopup}
                    onClose={() => setShowEditPopup(false)}
                    onConfirm={handleConfirmEdit}
                    mode="edit"
                    planName={planName}
                />

                {/* Share Popup */}
                <SharePopup
                    isOpen={showSharePopup}
                    onClose={() => setShowSharePopup(false)}
                    shareLink={`http://www.zoomit.com/plan/${selectedPlan?.ID || selectedPlan?._id || selectedPlan?.id}`}
                />

                {/* Save Plan Success Popup */}
                <PlanActionPopup
                    isOpen={showSaveSuccessPopup}
                    onClose={handleSaveSuccessClose}
                    onConfirm={handleSaveSuccessClose}
                    mode="success"
                />
            </div>
        </div>
    );
};

export default function Overview() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <OverviewContent />
        </Suspense>
    );
}
