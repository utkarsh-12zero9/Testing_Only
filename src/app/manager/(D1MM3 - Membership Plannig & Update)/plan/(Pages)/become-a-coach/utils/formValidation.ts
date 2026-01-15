import { FormData, FormErrors, UploadedFile } from '../localComponents/TrainerProfileForm/TrainerProfileForm';

export const validateTrainerProfileForm = (
    formData: FormData,
    profilePhotos?: UploadedFile[],
    isEditMode?: boolean
): { isValid: boolean; errors: FormErrors } => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
    }

    // Phone number is required only when creating, not when editing
    if (!isEditMode && !formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
    }

    if (!formData.yearOfExperience.trim()) {
        newErrors.yearOfExperience = 'Year of experience is required';
    }

    if (!formData.dateOfBirth.trim()) {
        newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.description.trim()) {
        newErrors.description = 'Profile description is required';
    }

    if (!formData.trainerExpertise.trim()) {
        newErrors.trainerExpertise = 'Trainer expertise is required';
    }

    // Validate profile picture
    if (!profilePhotos || profilePhotos.length === 0) {
        newErrors.profilePhotos = 'Profile picture is required';
    }

    return {
        isValid: Object.keys(newErrors).length === 0,
        errors: newErrors
    };
};


