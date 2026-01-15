import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CreatePlanForm.module.css';
import InputBox from '@/globalComponents/inputs/inputBox/InputBox';
import Dropdown from '@/globalComponents/inputs/Dropdown/Dropdown';
import RadioBox from '@/globalComponents/inputs/radioBox/RadioBox';
import PrimaryButton from '@/globalComponents/buttons/primaryButton/PrimaryButton';
import { validateCreatePlanForm, isFormValid } from '../../utils/formValidation';
import { createMembershipPlan } from '../../../../services/membershipService';
import { invalidatePlansCache } from '../../../../utils/cacheUtils';

interface CreatePlanFormProps {
    onSubmit?: (data: any) => void;
    mode?: 'create' | 'edit';
    initialData?: any;
    planID?: string;
}

const OBJECTIVES = [
    "Fat Loss",
    "Muscle Gain",
    "Muscle Toning",
    "Strength Building",
    "Weight Gain",
    "Endurance Improvement",
    "Flexibility & Mobility",
    "General Fitness & Wellness",
    "Posture & Balance Improvement",
    "Sports-Specific Training",
    "Rehabilitation & Recovery",
    "Stress Relief & Relaxation"
];

const ACCESSIBLE_FEATURES = [
    { label: 'Strength Training', value: 'strength_training' },
    { label: 'Cardio Training', value: 'cardio_training' },
    { label: 'Personal Training', value: 'personal_training' },
    { label: 'Group Classes', value: 'group_classes' },
    { label: 'Nutritional Coaching', value: 'nutritional_coaching' }
];

const MEMBERSHIP_TYPE_OPTIONS = [
    { label: 'Period-Based', value: 'Period-Based' },
    { label: 'Session-Based', value: 'Session-Based' }
];

const PERIOD_OPTIONS = [
    { label: '30 Days', value: '30' },
    { label: '90 Days', value: '90' },
    { label: '180 Days', value: '180' },
    { label: '365 Days', value: '365' }
];

export default function CreatePlanForm({ onSubmit, mode = 'create', initialData, planID }: CreatePlanFormProps) {
    const router = useRouter();
    const [membershipName, setMembershipName] = useState('');
    const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);
    const [showAllObjectives, setShowAllObjectives] = useState(false);
    const [accessibleFeatures, setAccessibleFeatures] = useState<string[]>([]);
    const [membershipType, setMembershipType] = useState('Session-Based');
    const [period, setPeriod] = useState('');
    const [totalPayout, setTotalPayout] = useState('');
    const [sessionCount, setSessionCount] = useState('');
    const [sessionPrice, setSessionPrice] = useState('');
    const [planPrice, setPlanPrice] = useState('');
    const [validity, setValidity] = useState('');

    const [onlinePaymentConsents, setOnlinePaymentConsents] = useState<string[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pre-fill form fields in edit mode
    useEffect(() => {
        if (mode === 'edit' && initialData) {
            setMembershipName(initialData.name || initialData.membershipName || initialData.planName || '');
            setSelectedObjectives(initialData.membershipObjective || initialData.objective || []);
            setAccessibleFeatures(initialData.keyFeatures || []);
            setMembershipType(initialData.membershipType || 'Session-Based');

            const durationDetails = initialData.durationDetails || {};
            const isPeriodBased = initialData.membershipType === 'Period-Based';

            if (isPeriodBased) {
                setPeriod(String(durationDetails.period || ''));
                setPlanPrice(String(durationDetails.periodPrice || ''));
            } else {
                setSessionCount(String(durationDetails.sessionCount || ''));
                setSessionPrice(String(durationDetails.sessionPrice || ''));
                setValidity(String(durationDetails.validity || ''));
            }

            // Check if online payment is enabled
            if (initialData.paymentID) {
                setOnlinePaymentConsents(['terms_accepted']);
            }
        }
    }, [mode, initialData]);

    const handleInputChange = useCallback((field: string, value: string, clearError = true) => {
        const setters: { [key: string]: (value: string) => void } = {
            membershipName: setMembershipName,
            period: setPeriod,
            totalPayout: setTotalPayout,
            planPrice: setPlanPrice,
            sessionCount: setSessionCount,
            sessionPrice: setSessionPrice,
            validity: setValidity,
        };

        const setter = setters[field];
        if (setter) {
            setter(value);
            if (clearError && value) {
                setErrors(prev => ({ ...prev, [field]: '' }));
            }
        }
    }, []);

    const handleFeatureToggle = useCallback((feature: string) => {
        let newFeatures;
        if (accessibleFeatures.includes(feature)) {
            newFeatures = accessibleFeatures.filter(f => f !== feature);
        } else {
            newFeatures = [...accessibleFeatures, feature];
        }
        setAccessibleFeatures(newFeatures);
        if (newFeatures.length > 0) {
            setErrors(prev => ({ ...prev, accessibleFeatures: '' }));
        }
    }, [accessibleFeatures]);

    const handleObjectiveToggle = useCallback((objective: string) => {
        let newObjectives;
        if (selectedObjectives.includes(objective)) {
            newObjectives = selectedObjectives.filter(obj => obj !== objective);
        } else {
            newObjectives = [...selectedObjectives, objective];
        }
        setSelectedObjectives(newObjectives);
        if (newObjectives.length >= 4) {
            setErrors(prev => ({ ...prev, selectedObjectives: '' }));
        }
    }, [selectedObjectives]);

    const handleMembershipTypeChange = useCallback(({ value }: { name: string, value: string }) => {
        setMembershipType(value);
        setPeriod('');
        setSessionCount('');
        setSessionPrice('');
        setPlanPrice('');
        setValidity('');
        setTotalPayout('');
        setErrors({});
    }, []);

    // Change handler for all input events
    const handleChange = useCallback((field: string, value?: any) => {
        switch (field) {
            case 'membershipName':
            case 'period':
            case 'planPrice':
            case 'sessionCount':
            case 'sessionPrice':
            case 'validity':
                handleInputChange(field, value);
                break;
            case 'membershipType':
                handleMembershipTypeChange(value);
                break;
            case 'termsCheckbox':
                if (onlinePaymentConsents.includes('terms_accepted')) {
                    setOnlinePaymentConsents(onlinePaymentConsents.filter(c => c !== 'terms_accepted'));
                    setErrors(prev => ({ ...prev, onlinePaymentConsents: 'You must accept the terms and conditions' }));
                } else {
                    setOnlinePaymentConsents([...onlinePaymentConsents, 'terms_accepted']);
                    setErrors(prev => ({ ...prev, onlinePaymentConsents: '' }));
                }
                break;
        }
    }, [handleInputChange, handleMembershipTypeChange, onlinePaymentConsents]);

    const formData = useMemo(() => ({
        membershipName,
        selectedObjectives,
        accessibleFeatures,
        membershipType: membershipType as 'Period-Based' | 'Session-Based',
        period,
        planPrice,
        sessionCount,
        sessionPrice,
        validity,
        onlinePaymentConsents
    }), [membershipName, selectedObjectives, accessibleFeatures, membershipType, period, planPrice, sessionCount, sessionPrice, validity, onlinePaymentConsents]);

    const validateForm = useCallback(() => {
        const validationErrors = validateCreatePlanForm(formData);
        setErrors(validationErrors);
        return isFormValid(validationErrors);
    }, [formData]);

    const handleSaveAndNext = useCallback(async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Get businessID
            const businessDataStr = localStorage.getItem('businessData');
            if (!businessDataStr) {
                alert('Business data not found. Please log in again.');
                setIsSubmitting(false);
                return;
            }

            const businessData = JSON.parse(businessDataStr);
            const businessID = businessData?.ID;

            if (!businessID) {
                alert('Business ID not found. Please log in again.');
                setIsSubmitting(false);
                return;
            }

            // Prepare payload
            const payload: any = {
                membershipName,
                membershipType,
                membershipObjective: selectedObjectives,
                keyFeatures: accessibleFeatures,
            };

            if (membershipType === 'Period-Based') {
                payload.period = Number(period);
                payload.planPrice = Number(planPrice);
            } else {
                payload.sessionCount = Number(sessionCount);
                payload.sessionPrice = Number(sessionPrice);
                payload.validity = Number(validity);
            }

            // Auto-fetch paymentID from sessionStorage (assigned when slot was purchased)
            if (onlinePaymentConsents.includes('terms_accepted')) {
                const storedPaymentID = sessionStorage.getItem('slotPaymentID');
                if (storedPaymentID) {
                    payload.paymentID = storedPaymentID;
                }
            }

            // Call createMembershipPlan API immediately
            const response = await createMembershipPlan(businessID, payload);

            if (response?.success && response?.data) {
                // Extract planID from response
                const createdPlanID = response.data.plan?.ID || response.data.ID || response.data.planID;

                if (!createdPlanID) {
                    alert('Plan created but planID not found in response. Please contact support.');
                    setIsSubmitting(false);
                    return;
                }

                // Invalidate plans cache so the new plan appears in the list
                invalidatePlansCache();

                // Save form data to localStorage for final overview page
                const dataToSave = {
                    ...payload,
                    businessID
                };
                localStorage.setItem('createFormData', JSON.stringify(dataToSave));

                // Navigate to become-a-coach page with only planID as query parameter
                const params = new URLSearchParams({
                    planID: createdPlanID
                });
                router.push(`/manager/plan/become-a-coach?${params.toString()}`);
            } else {
                alert(response?.message || 'Failed to create membership plan. Please try again.');
                setIsSubmitting(false);
            }
        } catch (error: any) {
            console.error('Error creating membership plan:', error);
            alert(error?.data?.message || 'An error occurred while creating the plan. Please try again.');
            setIsSubmitting(false);
        }
    }, [validateForm, membershipName, membershipType, selectedObjectives, accessibleFeatures, onlinePaymentConsents, period, planPrice, sessionCount, sessionPrice, validity, router]);

    const displayedObjectives = useMemo(() =>
        showAllObjectives ? OBJECTIVES : OBJECTIVES.slice(0, 7),
        [showAllObjectives]
    );

    return (
        <div className={styles.formContainer}>
            <InputBox
                name="membershipName"
                label="Membership Name"
                placeholder="E.g. Gold Membership"
                value={membershipName}
                onChange={({ value }) => handleChange('membershipName', value)}
                error={errors.membershipName}
            />

            <div className={styles.formSection}>
                <label className={styles.label}>
                    Membership Objectives
                    <span className={styles.optionalText}>(Select at-least four options)</span>
                </label>
                {errors.selectedObjectives && <span style={{ color: 'red', fontSize: '12px' }}>{errors.selectedObjectives}</span>}

                <div className={styles.objectivesGrid}>
                    {displayedObjectives.map((obj, index) => (
                        <button
                            key={`${obj}-${index}`}
                            className={`${styles.objectiveChip} ${selectedObjectives.includes(obj) ? styles.selected : ''}`}
                            onClick={() => handleObjectiveToggle(obj)}
                        >
                            {obj}
                        </button>
                    ))}
                    {!showAllObjectives && (
                        <button
                            className={styles.objectiveChipSeeAll}
                            onClick={() => setShowAllObjectives(true)}
                        >
                            See all
                        </button>
                    )}
                </div>
            </div>

            <div className={styles.formSection}>
                <label className={styles.label}>
                    Accessible Features
                    <span className={styles.optionalText}>(Select features available in this plan)</span>
                </label>
                {errors.accessibleFeatures && <span style={{ color: 'red', fontSize: '12px' }}>{errors.accessibleFeatures}</span>}

                <Dropdown
                    name="accessibleFeatures"
                    label=""
                    placeholder="Select accessible features"
                    value={accessibleFeatures.length > 0 ? accessibleFeatures.join(', ') : ''}
                    options={ACCESSIBLE_FEATURES}
                    onChange={({ value }) => handleFeatureToggle(value)}
                    error=""
                />

                {accessibleFeatures.length > 0 && (
                    <div className={styles.selectedFeaturesContainer}>
                        {ACCESSIBLE_FEATURES.filter(f => accessibleFeatures.includes(f.value)).map((feature) => (
                            <div key={feature.value} className={styles.selectedFeatureChip}>
                                {feature.label}
                                <button
                                    className={styles.removeFeatureBtn}
                                    onClick={() => handleFeatureToggle(feature.value)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.payoutSection}>
                <h3 className={styles.payoutTitle}>Choose your Payout</h3>
                <p className={styles.payoutDescription}>
                    The Pay-out is the Money you will get after all the deduction of processing & management fee.
                </p>

                <div className={styles.membershipTypeWrapper}>
                    <RadioBox
                        name="membershipType"
                        label="Membership Type"
                        value={membershipType}
                        options={MEMBERSHIP_TYPE_OPTIONS}
                        onChange={(value) => handleChange('membershipType', value)}
                        error=""
                    />
                </div>

                {membershipType === 'Period-Based' ? (
                    <>
                        <Dropdown
                            name="period"
                            label="Period"
                            placeholder="Select your Period"
                            value={period}
                            options={PERIOD_OPTIONS}
                            onChange={({ value }) => handleChange('period', value)}
                            error={errors.period}
                            optional="The Duration of the Plan"
                        />
                        <InputBox
                            name="planPrice"
                            label="Plan Price"
                            placeholder="₹ ___"
                            value={planPrice}
                            onChange={({ value }) => handleChange('planPrice', value)}
                            error={errors.planPrice}
                        />
                    </>
                ) : (
                    <>
                        <InputBox
                            name="sessionCount"
                            label="Session Count"
                            placeholder="Number of sessions"
                            value={sessionCount}
                            onChange={({ value }) => handleChange('sessionCount', value)}
                            error={errors.sessionCount}
                        />
                        <InputBox
                            name="sessionPrice"
                            label="Session Price"
                            placeholder="₹ ___ per session"
                            value={sessionPrice}
                            onChange={({ value }) => handleChange('sessionPrice', value)}
                            error={errors.sessionPrice}
                        />
                        <InputBox
                            name="validity"
                            label="Validity (Days)"
                            placeholder="Validity in days"
                            value={validity}
                            onChange={({ value }) => handleChange('validity', value)}
                            error={errors.validity}
                        />
                    </>
                )}
            </div>

            {/* Online Payment Section */}
            <div className={styles.onlinePaymentSection}>
                <h3 className={styles.onlinePaymentTitle}>Want to enable Online Payment?</h3>
                <p className={styles.disclaimer}>
                    <strong>Disclaimer:</strong> Your Plan Charges will be Collected Via Our Payment gate from the customer and transferred to your bank account after deducting the Gateway transaction Charges, TDS (Tax Deduction at Sources), System Charges (if Applicable) or any taxable deduction as per the government laws. If you prefer to deal in cash only, Do not Select the given check box below.
                </p>

                <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={onlinePaymentConsents.includes('terms_accepted')}
                            onChange={() => handleChange('termsCheckbox')}
                        />
                        <span className={styles.checkboxText}>
                            I accept the terms and conditions and acknowledge that I want to collect the Membership payment via online mode and agree to abide by the company's policies and guidelines.
                        </span>
                    </label>
                    {errors.onlinePaymentConsents && <span style={{ color: 'red', fontSize: '12px' }}>{errors.onlinePaymentConsents}</span>}
                </div>



                <div className={styles.infoBox}>
                    <span className={styles.infoIcon}>ℹ</span>
                    <p className={styles.infoText}>
                        By clicking the "Save" button, you'll agree to the T&C.
                    </p>
                </div>
            </div>

            <PrimaryButton onClick={handleSaveAndNext} type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Plan...' : mode === 'edit' ? 'Update' : 'Save & Next'}
            </PrimaryButton>
        </div>
    );
};