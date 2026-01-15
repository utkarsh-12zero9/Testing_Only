'use client';
import React, { useState, useCallback, useMemo, memo, useEffect } from 'react';
import styles from './TrainerProfilePopup.module.css';
import PrimaryButton from '@/globalComponents/buttons/primaryButton/PrimaryButton';
import { Option } from '@/globalComponents/inputs/types';
import TrainerProfileForm, { type FormData, FormErrors, type UploadedFile } from '../TrainerProfileForm/TrainerProfileForm';
import { validateTrainerProfileForm } from '../../utils/formValidation';
import { Info } from 'lucide-react';
import CommonPopup from '@/globalComponents/Popups/Common/CommonPopup';
import { createTrainerProfile, updateTrainerProfileByTrainerID } from '../../../../services/trainerService';

interface TrainerProfilePopupProps {
    isOpen: boolean;
    onClose: () => void;
    slotIndex: number | null;
    onTrainerAdded: (trainerData: { name: string; expertise: string; gender: 'male' | 'female' }) => void;
    onRefetch?: () => void;
    initialData?: {
        ID?: string;
        name: string;
        expertise: string;
        gender: 'male' | 'female';
        phone?: string;
        email?: string;
        yearOfExperience?: string;
        age?: number;
        description?: string;
        certificationTitle?: string;
        affiliatedInstitute?: string;
        dateOfRecognition?: string;
    };
}

const TrainerProfilePopup: React.FC<TrainerProfilePopupProps> = ({
    isOpen,
    onClose,
    slotIndex,
    onTrainerAdded,
    onRefetch,
    initialData
}) => {
    const [formData, setFormData] = useState<FormData>({
        registerYourself: false,
        fullName: '',
        phone: '',
        email: '',
        yearOfExperience: '',
        dateOfBirth: '',
        gender: '',
        trainerExpertise: '',
        description: '',
        certificationTitle: '',
        affiliatedInstitute: '',
        dateOfRecognition: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [profilePhotos, setProfilePhotos] = useState<UploadedFile[]>([]);
    const [recognitionProof, setRecognitionProof] = useState<UploadedFile[]>([]);

    // Pre-fill form when editing existing trainer
    useEffect(() => {
        if (initialData && isOpen) {
            let dateOfBirth = '';
            if (initialData.age) {
                const currentYear = new Date().getFullYear();
                const birthYear = currentYear - initialData.age;
                dateOfBirth = `${birthYear}-01-01`;
            }

            setFormData(prev => ({
                ...prev,
                fullName: initialData.name || '',
                gender: initialData.gender || '',
                trainerExpertise: initialData.expertise || '',
                phone: initialData.phone || '',
                email: initialData.email || '',
                yearOfExperience: initialData.yearOfExperience || '',
                dateOfBirth: dateOfBirth,
                description: initialData.description || '',
                certificationTitle: initialData.certificationTitle || '',
                affiliatedInstitute: initialData.affiliatedInstitute || '',
                dateOfRecognition: initialData.dateOfRecognition || ''
            }));
        } else if (!isOpen) {
            // Reset form when popup closes
            setFormData({
                registerYourself: false,
                fullName: '',
                phone: '',
                email: '',
                yearOfExperience: '',
                dateOfBirth: '',
                gender: '',
                trainerExpertise: '',
                description: '',
                certificationTitle: '',
                affiliatedInstitute: '',
                dateOfRecognition: '',
            });
            setProfilePhotos([]);
            setRecognitionProof([]);
            setErrors({});
        }
    }, [initialData, isOpen]);

    const expertiseOptions: Option[] = useMemo(() => [
        { value: 'strength-training', label: 'Strength Training' },
        { value: 'cardio-training', label: 'Cardio Training' },
        { value: 'personal-training', label: 'Personal Training' },
        { value: 'group-classes', label: 'Group Classes' },
        { value: 'nutritional-coaching', label: 'Nutritional Coaching' },
    ], []);

    const handleChange = useCallback((params: { name: string; value: string | boolean; type?: string }) => {
        const { name, value } = params;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (typeof value === 'string' && errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }, [errors]);

    const validateForm = useCallback(() => {
        const isEditMode = !!initialData?.ID;
        const { isValid, errors: newErrors } = validateTrainerProfileForm(formData, profilePhotos, isEditMode);
        setErrors(newErrors);
        return isValid;
    }, [formData, profilePhotos, initialData]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                // Get businessID
                let businessID = localStorage.getItem('businessID') || undefined;
                if (!businessID) {
                    const businessData = localStorage.getItem('businessData');
                    if (businessData) {
                        try {
                            const parsedData = JSON.parse(businessData);
                            businessID = parsedData.ID || parsedData.businessID || parsedData._id;
                        } catch (e) { }
                    }
                }

                if (!businessID) {
                    console.error('Business ID not found');
                    alert('Business ID not found. Please ensure you are logged in.');
                    return;
                }

                const planID = localStorage.getItem('lastCreatedPlanID');
                const isEditMode = initialData?.ID;
                const apiFormData = new FormData();

                if (isEditMode) {
                    apiFormData.append('fullName', formData.fullName);

                    if (formData.dateOfBirth) {
                        const dob = new Date(formData.dateOfBirth);
                        if (!isNaN(dob.getTime())) {
                            const ageDifMs = Date.now() - dob.getTime();
                            const ageDate = new Date(ageDifMs);
                            const age = Math.abs(ageDate.getUTCFullYear() - 1970);
                            apiFormData.append('age', String(age));
                        }
                    }

                    // Send expertise
                    apiFormData.append('expertise', JSON.stringify([formData.trainerExpertise]));

                    // Send profile description
                    apiFormData.append('profileDescription', formData.description || 'No description provided');

                    // Send profile picture if provided
                    if (profilePhotos.length > 0 && profilePhotos[0].file) {
                        apiFormData.append('profilePicture', profilePhotos[0].file);
                    }
                } else {
                    // For CREATE: Send all fields as before
                    apiFormData.append('businessID', businessID);

                    // Add planID if exists (as individual entry, not JSON array)
                    if (planID) {
                        apiFormData.append('planID', planID);
                    }

                    apiFormData.append('fullName', formData.fullName);
                    apiFormData.append('phoneNo', formData.phone);
                    if (formData.email) apiFormData.append('email', formData.email);
                    apiFormData.append('experience', formData.yearOfExperience);
                    apiFormData.append('profileDescription', formData.description || 'No description provided');

                    apiFormData.append('expertise', JSON.stringify([formData.trainerExpertise]));

                    const capitalizedGender = formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1);
                    apiFormData.append('gender', capitalizedGender);

                    if (formData.dateOfBirth) {
                        const dob = new Date(formData.dateOfBirth);
                        if (!isNaN(dob.getTime())) {
                            const ageDifMs = Date.now() - dob.getTime();
                            const ageDate = new Date(ageDifMs);
                            const age = Math.abs(ageDate.getUTCFullYear() - 1970);
                            apiFormData.append('age', String(age));
                        } else {
                            console.warn('Invalid date of birth, using default age');
                            apiFormData.append('age', '25'); // Default age if date is invalid
                        }
                    } else {
                        console.warn('No date of birth provided, using default age');
                        apiFormData.append('age', '25'); // Default age if not provided
                    }

                    if (profilePhotos.length > 0 && profilePhotos[0].file) {
                        apiFormData.append('profilePicture', profilePhotos[0].file);
                    } else {
                        console.warn('No profile picture selected');
                    }

                    if (recognitionProof.length > 0 && recognitionProof[0].file) {
                        apiFormData.append('certification', recognitionProof[0].file);
                    }
                }

                let result;

                if (isEditMode) {
                    result = await updateTrainerProfileByTrainerID(initialData.ID!, apiFormData);
                } else {
                    result = await createTrainerProfile(apiFormData);
                }

                if (result.success) {
                    if (!isEditMode) {
                        localStorage.removeItem('lastCreatedPlanID');
                        localStorage.removeItem('formData');
                        // Refetch trainers after creating new trainer
                        if (onRefetch) {
                            onRefetch();
                        }
                    }

                    setShowSuccessPopup(true);
                } else {
                    alert(result.message || `Failed to ${isEditMode ? 'update' : 'create'} trainer profile`);
                }
            } catch (error: any) {
                console.error(`Error ${initialData?.ID ? 'updating' : 'creating'} trainer profile:`, error);
                alert(error.data?.message || `An error occurred while ${initialData?.ID ? 'updating' : 'creating'} the trainer profile`);
            }
        }
    }, [validateForm, formData, profilePhotos, recognitionProof, initialData]);

    const handleAddMore = useCallback(() => {
        const trainerData = {
            name: formData.fullName,
            expertise: formData.trainerExpertise,
            gender: formData.gender as 'male' | 'female',
        };
        onTrainerAdded(trainerData);
        setShowSuccessPopup(false);
        onClose();
    }, [formData.fullName, formData.trainerExpertise, onTrainerAdded, onClose]);

    if (!isOpen) return null;

    if (showSuccessPopup) {
        const isEditMode = initialData?.ID;
        return (
            <CommonPopup
                variant="success"
                title={isEditMode ? "Trainer's Profile Updated" : "Trainer Added!"}
                buttonText={isEditMode ? "Trainer Added" : "Add More"}
                onClick={handleAddMore}
            >
                {isEditMode ? "Your trainer's profile has been updated." : "The Trainer has been added successfully."}
            </CommonPopup>
        );
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.popup}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.popupContent}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <TrainerProfileForm
                            formData={formData}
                            errors={errors}
                            handleChange={handleChange}
                            expertiseOptions={expertiseOptions}
                            profilePhotos={profilePhotos}
                            setProfilePhotos={setProfilePhotos}
                            recognitionProof={recognitionProof}
                            setRecognitionProof={setRecognitionProof}
                        />

                        <div className={styles.disclaimer}>
                            <span className={styles.infoIcon}> <Info size={20} /></span>
                            <p>By clicking the update button, you'll agree to the T&C.</p>
                        </div>


                        <PrimaryButton
                            type="submit"
                            onClick={() => { }}
                            colorVariant="primary-green"
                        >
                            Save & Next
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default memo(TrainerProfilePopup);
