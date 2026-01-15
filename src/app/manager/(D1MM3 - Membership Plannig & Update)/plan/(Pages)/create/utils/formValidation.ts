export interface CreatePlanFormData {
    membershipName: string;
    selectedObjectives: string[];
    accessibleFeatures: string[];
    membershipType: 'Period-Based' | 'Session-Based';
    period?: string;
    planPrice?: string;
    sessionCount?: string;
    sessionPrice?: string;
    validity?: string;
    onlinePaymentConsents: string[];
}

export interface ValidationErrors {
    [key: string]: string;
}

export function validateCreatePlanForm(formData: CreatePlanFormData): ValidationErrors {
    const errors: ValidationErrors = {};

    if (!formData.membershipName.trim()) {
        errors.membershipName = 'Membership Name is required';
    }

    if (formData.selectedObjectives.length < 4) {
        errors.selectedObjectives = 'Select at least 4 objectives';
    }

    if (formData.accessibleFeatures.length === 0) {
        errors.accessibleFeatures = 'Select at least one accessible feature';
    }

    if (formData.membershipType === 'Period-Based') {
        if (!formData.period) {
            errors.period = 'Period is required';
        }
        if (!formData.planPrice) {
            errors.planPrice = 'Plan Price is required';
        }
    }
    else {
        if (!formData.sessionCount) {
            errors.sessionCount = 'Session Count is required';
        }
        if (!formData.sessionPrice) {
            errors.sessionPrice = 'Session Price is required';
        }
        if (!formData.validity) {
            errors.validity = 'Validity is required';
        }
    }

    if (!formData.onlinePaymentConsents.includes('terms_accepted')) {
        errors.onlinePaymentConsents = 'You must accept the terms and conditions';
    }

    return errors;
}

export function isFormValid(errors: ValidationErrors): boolean {
    return Object.keys(errors).length === 0;
}

export function validateField(
    fieldName: keyof CreatePlanFormData,
    value: any,
    formData: Partial<CreatePlanFormData>
): string {
    switch (fieldName) {
        case 'membershipName':
            return !value?.trim() ? 'Membership Name is required' : '';

        case 'selectedObjectives':
            return (value as string[]).length < 4 ? 'Select at least 4 objectives' : '';

        case 'accessibleFeatures':
            return (value as string[]).length === 0 ? 'Select at least one accessible feature' : '';

        case 'period':
            return formData.membershipType === 'Period-Based' && !value
                ? 'Period is required'
                : '';

        case 'planPrice':
            return formData.membershipType === 'Period-Based' && !value
                ? 'Plan Price is required'
                : '';

        case 'sessionCount':
            return formData.membershipType === 'Session-Based' && !value
                ? 'Session Count is required'
                : '';

        case 'sessionPrice':
            return formData.membershipType === 'Session-Based' && !value
                ? 'Session Price is required'
                : '';

        case 'validity':
            return formData.membershipType === 'Session-Based' && !value
                ? 'Validity is required'
                : '';

        case 'onlinePaymentConsents':
            return !(value as string[]).includes('terms_accepted')
                ? 'You must accept the terms and conditions'
                : '';

        default:
            return '';
    }
}
