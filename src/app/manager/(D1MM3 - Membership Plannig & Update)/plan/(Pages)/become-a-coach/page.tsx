'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import HeaderManagerModule from '@/globalComponents/HeaderManager/ModuleHeader/ModuleHeader';
import Heading from '@/globalComponents/Heading/Heading';
import BottomNav from '@/globalComponents/BottomNav/BottomNav';
import PrimaryButton from '@/globalComponents/buttons/primaryButton/PrimaryButton';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import LockedSlotPopup from './localComponents/LockedSlotPopup/LockedSlotPopup';
import OrderSummary from './localComponents/OrderSummary/OrderSummary';
import PaymentSuccessful from './localComponents/PaymentSuccessful/PaymentSuccessful';
import TrainerProfilePopup from './localComponents/TrainerProfilePopup/TrainerProfilePopup';
import FilledTrainerSlot from './localComponents/FilledTrainerSlot/FilledTrainerSlot';
import TrainerDetailsPopup from './localComponents/TrainerDetailsPopup/TrainerDetailsPopup';
import PlanActionPopup from '../../components/PlanActionPopup/PlanActionPopup';
import { getTrainerProfileByBusinessID, deleteTrainerProfileByTrainerID, updateTrainerProfileByTrainerID } from '../../services/trainerService';
import { getBusinessProfile } from '../../services/businessProfile';
import styles from './page.module.css';
import { Info } from 'lucide-react';

export default function BecomeACoachPage() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get planID from URL query parameters
    const planIDFromURL = searchParams.get('planID');

    // Get membershipName from sessionStorage (passed as prop)
    const [membershipName, setMembershipName] = useState<string>('');

    const [isLockedPopupOpen, setIsLockedPopupOpen] = useState(false);
    const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
    const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false);
    const [isAddSlotPopupOpen, setIsAddSlotPopupOpen] = useState(false);
    const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [clickedSlotIndex, setClickedSlotIndex] = useState<number | null>(null);
    const [selectedTrainerIndex, setSelectedTrainerIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTrainerIds, setSelectedTrainerIds] = useState<Set<string>>(new Set());
    const [isUpdatingTrainers, setIsUpdatingTrainers] = useState(false);

    // Retrieve membershipName from createFormData in localStorage on component mount
    useEffect(() => {
        const createFormDataStr = localStorage.getItem('createFormData');
        if (createFormDataStr) {
            try {
                const formData = JSON.parse(createFormDataStr);
                if (formData.membershipName) {
                    setMembershipName(formData.membershipName);
                }
            } catch (error) {
                console.error('Error parsing createFormData:', error);
            }
        }
    }, []);

    interface TrainerData {
        ID?: string;
        name: string;
        expertise: string;
        gender: 'male' | 'female';
        phone: string;
        description?: string;
        yearOfExperience?: string;
        age?: number;
        profilePicture?: {
            path: string;
            originalname: string;
        };
        certificationTitle?: string;
        affiliatedInstitute?: string;
        dateOfRecognition?: string;
    }

    type SlotType = 'locked' | 'add' | { type: 'filled'; trainer: TrainerData };

    const [slots, setSlots] = useState<SlotType[]>([
        'add', 'add', 'add', 'add', 'add', 'add', 'add', 'add', 'add', // 9 add slots (including default 6 slots)
        'locked', 'locked', 'locked', 'locked', 'locked' // 5 locked slots
    ]);

    //? Fetch trainers from API
    const fetchTrainers = useCallback(async () => {
        try {
            setIsLoading(true);
            const businessDataStr = localStorage.getItem('businessData');

            if (!businessDataStr) {
                console.error('No businessData found in localStorage');
                setIsLoading(false);
                return;
            }

            const businessData = JSON.parse(businessDataStr);
            const businessID = businessData?.ID;

            if (!businessID) {
                console.error('No businessID found in businessData');
                setIsLoading(false);
                return;
            }

            const response = await getTrainerProfileByBusinessID(businessID);

            if (response.success && response.data?.trainerProfiles) {
                const trainers = response.data.trainerProfiles;

                // Map API trainers to slots
                const filledSlots: SlotType[] = trainers.map((trainer: any) => ({
                    type: 'filled' as const,
                    trainer: {
                        ID: trainer.ID,
                        name: trainer.name || '',
                        expertise: Array.isArray(trainer.expertise)
                            ? trainer.expertise.join(', ')
                            : trainer.expertise || '',
                        gender: (trainer.gender?.toLowerCase() === 'female' ? 'female' : 'male') as 'male' | 'female',
                        phone: trainer.phone || '',
                        description: trainer.desc || trainer.description,
                        yearOfExperience: trainer.yearOfExperience || trainer.age?.toString(),
                        age: trainer.age,
                        profilePicture: trainer.profilePicture,
                        certificationTitle: trainer.certificationTitle || trainer.certification?.title,
                        affiliatedInstitute: trainer.affiliatedInstitute || trainer.certification?.institute,
                        dateOfRecognition: trainer.dateOfRecognition || trainer.certification?.date
                    }
                }));

                // Calculate remaining add slots (up to 9 total including filled)
                const maxAddSlots = 9;
                const addSlotsCount = Math.max(0, maxAddSlots - filledSlots.length);
                const addSlots: SlotType[] = Array(addSlotsCount).fill('add');

                // Always keep 5 locked slots
                const lockedSlots: SlotType[] = Array(5).fill('locked');

                // Combine: filled trainers + remaining add slots + locked slots
                setSlots([...filledSlots, ...addSlots, ...lockedSlots]);
            }
        } catch (error) {
            console.error('Error fetching trainers:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    //? Fetch trainers on mount
    useEffect(() => {
        fetchTrainers();
    }, [fetchTrainers]);

    const handleModalChange = useCallback((
        action: 'openLocked' | 'closeLocked' | 'openOrder' | 'closeOrder' | 'openPayment' | 'closePayment' | 'openAddSlot' | 'closeAddSlot',
        slotIndex?: number
    ) => {
        switch (action) {
            case 'openLocked':
                setClickedSlotIndex(slotIndex ?? null);
                setIsLockedPopupOpen(true);
                break;
            case 'closeLocked':
                setIsLockedPopupOpen(false);
                setClickedSlotIndex(null);
                break;
            case 'openOrder':
                setIsLockedPopupOpen(false);
                setIsOrderSummaryOpen(true);
                break;
            case 'closeOrder':
                setIsOrderSummaryOpen(false);
                setClickedSlotIndex(null);
                break;
            case 'openPayment':
                setIsOrderSummaryOpen(false);
                setIsPaymentSuccessOpen(true);
                break;
            case 'closePayment':
                if (clickedSlotIndex !== null) {
                    setSlots(prevSlots => {
                        const newSlots = [...prevSlots];
                        newSlots[clickedSlotIndex] = 'add';
                        return newSlots;
                    });

                    //? Store paymentID for the purchased slot
                    // TODO: In production, replace this mock ID with actual paymentID from payment gateway response
                    const mockPaymentID = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                    sessionStorage.setItem('slotPaymentID', mockPaymentID);
                }
                setIsPaymentSuccessOpen(false);
                setClickedSlotIndex(null);
                break;
            case 'openAddSlot':
                setClickedSlotIndex(slotIndex ?? null);
                setIsAddSlotPopupOpen(true);
                break;
            case 'closeAddSlot':
                setIsAddSlotPopupOpen(false);
                setClickedSlotIndex(null);
                break;
        }
    }, [clickedSlotIndex, router]);

    const handleTrainerAdded = useCallback((trainerData: { name: string; expertise: string; gender: 'male' | 'female'; phone?: string; description?: string; yearOfExperience?: string }) => {
        if (clickedSlotIndex !== null) {
            setSlots(prevSlots => {
                const newSlots = [...prevSlots];
                const fullTrainer: TrainerData = {
                    name: trainerData.name,
                    expertise: trainerData.expertise,
                    gender: trainerData.gender,
                    phone: trainerData.phone ?? '',
                    description: trainerData.description,
                    yearOfExperience: trainerData.yearOfExperience,
                };
                newSlots[clickedSlotIndex] = { type: 'filled', trainer: fullTrainer };
                // TODO: Save trainer data to API when integrating backend
                return newSlots;
            });
        }
    }, [clickedSlotIndex]);

    const toggleTrainerSelection = useCallback((trainerId: string) => {
        setSelectedTrainerIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(trainerId)) {
                newSet.delete(trainerId);
            } else {
                newSet.add(trainerId);
            }
            return newSet;
        });
    }, []);

    const handleDeleteConfirm = useCallback(async () => {
        if (selectedTrainerIndex !== null) {
            const slot = slots[selectedTrainerIndex];
            if (typeof slot === 'object' && slot.type === 'filled' && slot.trainer.ID) {
                try {
                    const result = await deleteTrainerProfileByTrainerID(slot.trainer.ID);
                    if (result.success) {
                        setSlots(prevSlots => {
                            const newSlots = [...prevSlots];
                            newSlots[selectedTrainerIndex] = 'add';
                            return newSlots;
                        });
                        setIsDeleteConfirmOpen(false);
                        setIsDetailsPopupOpen(false);
                        setSelectedTrainerIndex(null);
                        console.log('Trainer profile deleted successfully');
                    } else {
                        alert(result.message || 'Failed to delete trainer profile');
                    }
                } catch (error: unknown) {
                    console.error('Error deleting trainer:', error);
                    const errorMsg = error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data ? String(error.data.message) : 'An error occurred while deleting the trainer profile';
                    alert(errorMsg);
                }
            }
        }
    }, [selectedTrainerIndex, slots]);

    // Check if there are any selected trainers
    const hasSelectedTrainers = useMemo(() => {
        return selectedTrainerIds.size > 0;
    }, [selectedTrainerIds]);

    const handleNextClick = useCallback(async () => {
        if (selectedTrainerIds.size === 0) {
            alert('Please select at least one trainer to proceed.');
            return;
        }

        if (!planIDFromURL) {
            alert('Plan ID not found. Please create a plan first.');
            return;
        }

        if (!membershipName) {
            alert('Membership name not found. Please create a plan first.');
            return;
        }

        setIsUpdatingTrainers(true);

        try {
            // Get businessID
            const businessDataStr = localStorage.getItem('businessData');
            if (!businessDataStr) {
                alert('Business data not found. Please log in again.');
                setIsUpdatingTrainers(false);
                return;
            }

            const businessData = JSON.parse(businessDataStr);
            const businessID = businessData?.ID;

            if (!businessID) {
                alert('Business ID not found. Please log in again.');
                setIsUpdatingTrainers(false);
                return;
            }

            // Get all selected trainers from slots
            const selectedTrainers = Array.from(selectedTrainerIds).map(trainerId => {
                const slot = slots.find(s =>
                    typeof s === 'object' && s.type === 'filled' && s.trainer.ID === trainerId
                );
                return typeof slot === 'object' && slot.type === 'filled' ? slot.trainer : null;
            }).filter(Boolean);

            // Update each selected trainer with the plan information
            const updatePromises = selectedTrainers.map(async (trainer) => {
                if (!trainer?.ID) return { success: false, trainer: 'Unknown' };

                try {
                    // Get existing trainer data first
                    const formData = new FormData();

                    // Add plan to trainer's plans array
                    const planToAdd = {
                        planID: planIDFromURL,
                        membershipName: membershipName
                    };

                    // Note: We're adding the plan as a JSON string
                    // The backend should parse this and append it to the trainer's plans array
                    formData.append('plans', JSON.stringify([planToAdd]));
                    formData.append('addPlan', 'true'); // Flag to indicate we're adding a plan

                    const response = await updateTrainerProfileByTrainerID(trainer.ID, formData);

                    if (response?.success) {
                        return { success: true, trainer: trainer.name };
                    } else {
                        return { success: false, trainer: trainer.name, error: response?.message };
                    }
                } catch (error: unknown) {
                    console.error(`Error updating trainer ${trainer.name}:`, error);
                    const errorMsg = error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data ? String(error.data.message) : (error && typeof error === 'object' && 'message' in error ? String(error.message) : 'Unknown error');
                    return { success: false, trainer: trainer.name, error: errorMsg };
                }
            });

            const results = await Promise.all(updatePromises);

            // Check for any failures
            const failures = results.filter(r => !r.success);

            if (failures.length > 0) {
                const failedTrainers = failures.map(f => `${f.trainer}: ${f.error || 'Unknown error'}`).join('\n');
                alert(`Failed to update the following trainers:\n${failedTrainers}`);
                setIsUpdatingTrainers(false);
                return;
            }

            // All trainers updated successfully, now check KYC status
            const profileResponse = await getBusinessProfile(businessID);

            if (profileResponse?.success && profileResponse?.data) {
                const isKYCVerified = profileResponse.data.KYCVerified;

                if (isKYCVerified === true) {
                    //* If KYC is verified, navigate to payout overview (step 3)
                    router.push('/manager/plan/payout-overview');
                } else {
                    //! If KYC is not verified, navigate to KYC verification page
                    router.push('/manager/plan/kyc-verification');
                }
            } else {
                alert('Unable to verify KYC status. Please try again.');
                setIsUpdatingTrainers(false);
            }
        } catch (error) {
            console.error('Error updating trainers:', error);
            alert('An error occurred while updating trainers. Please try again.');
            setIsUpdatingTrainers(false);
        }
    }, [selectedTrainerIds, planIDFromURL, membershipName, slots, router]);

    const formDescription = "You can also register yourself as a Coach/Trainer or add your hired coach/trainer's profile as these profiles will be featured on the webpage to show your credibility and expertise."

    return (
        <div className={styles.container}>
            <div className={styles.containerWrapper}>
                <HeaderManagerModule moduleName='My Plan' />

                <div className={styles.mainArea}>
                    <Heading
                        title="Become a Coach"
                        description="Show the mentorship ability of your business."
                    />

                    <ProgressBar currentStep={2} />

                    <div className={styles.trainerCard}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Create Trainer's Profile</h3>
                            <p className={styles.cardDescription}>
                                {formDescription}
                            </p>
                        </div>

                        <div className={styles.slotsContainer}>
                            {isLoading ? (
                                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--pure-white)' }}>
                                    Loading trainers...
                                </div>
                            ) : (
                                slots.map((slotType, index) => (
                                    <div key={index}>
                                        {typeof slotType === 'object' && slotType.type === 'filled' ? (
                                            <FilledTrainerSlot
                                                trainerName={slotType.trainer.name}
                                                expertise={slotType.trainer.expertise}
                                                gender={slotType.trainer.gender}
                                                trainerId={slotType.trainer.ID}
                                                isSelected={slotType.trainer.ID ? selectedTrainerIds.has(slotType.trainer.ID) : false}
                                                onSelect={toggleTrainerSelection}
                                                onViewDetails={() => {
                                                    setSelectedTrainerIndex(index);
                                                    setIsDetailsPopupOpen(true);
                                                }}
                                            />
                                        ) : slotType === 'add' ? (
                                            <div
                                                className={styles.slot}
                                                onClick={() => handleModalChange('openAddSlot', index)}
                                            >
                                                <img src="/plan/addIcon.svg" alt="Add Slot" width="20" height="20" />
                                            </div>
                                        ) : (
                                            <div
                                                className={styles.slot}
                                                onClick={() => handleModalChange('openLocked', index)}
                                            >
                                                <img src="/plan/lockIcon.svg" alt="Locked Slot" width="20" height="20" />
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        <div className={styles.footerNote}>
                            <Info className={styles.infoIcon} size={20} />
                            <p>By clicking the Update button, you'll agree to the T&C.</p>
                        </div>

                        {hasSelectedTrainers && (
                            <div className={styles.nextButtonContainer}>
                                <PrimaryButton
                                    onClick={handleNextClick}
                                    colorVariant="primary-green"
                                    className={styles.nextButton}
                                    disabled={isUpdatingTrainers}
                                >
                                    {isUpdatingTrainers ? 'Updating Trainers...' : 'Next'}
                                </PrimaryButton>
                            </div>
                        )}
                    </div>
                </div>

                <BottomNav pathname={pathname} />
            </div>

            <LockedSlotPopup
                isOpen={isLockedPopupOpen}
                onClose={() => handleModalChange('closeLocked')}
                onBuyNow={() => handleModalChange('openOrder')}
                title="Trainer's Slot Locked!"
                description="You can buy this slot to add more Trainer for your customers."
            />

            <OrderSummary
                isOpen={isOrderSummaryOpen}
                onClose={() => handleModalChange('closeOrder')}
                onPayNow={() => handleModalChange('openPayment')}
            />

            <PaymentSuccessful
                isOpen={isPaymentSuccessOpen}
                onClose={() => handleModalChange('closePayment')}
            />

            <TrainerProfilePopup
                isOpen={isAddSlotPopupOpen}
                onClose={() => handleModalChange('closeAddSlot')}
                slotIndex={clickedSlotIndex}
                onTrainerAdded={handleTrainerAdded}
                onRefetch={fetchTrainers}
                initialData={
                    clickedSlotIndex !== null &&
                        typeof slots[clickedSlotIndex] === 'object' &&
                        slots[clickedSlotIndex].type === 'filled'
                        ? slots[clickedSlotIndex].trainer
                        : undefined
                }
            />

            <TrainerDetailsPopup
                isOpen={isDetailsPopupOpen}
                onClose={() => {
                    setIsDetailsPopupOpen(false);
                    setSelectedTrainerIndex(null);
                }}
                onEdit={() => {
                    setIsDetailsPopupOpen(false);
                    if (selectedTrainerIndex !== null) {
                        setClickedSlotIndex(selectedTrainerIndex);
                        setIsAddSlotPopupOpen(true);
                    }
                }}
                onDelete={() => {
                    setIsDeleteConfirmOpen(true);
                }}
                trainerData={
                    selectedTrainerIndex !== null &&
                        typeof slots[selectedTrainerIndex] === 'object' &&
                        slots[selectedTrainerIndex].type === 'filled'
                        ? slots[selectedTrainerIndex].trainer
                        : { name: '', gender: 'male', expertise: '', phone: '' }
                }
            />

            <PlanActionPopup
                isOpen={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                mode="remove"
            />
        </div>
    );
}
