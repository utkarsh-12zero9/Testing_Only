// Type definitions for D1MM3 - Membership Planning & Update module

export interface MembershipPlanPayload {
    membershipName: string;
    membershipType: 'Period-Based' | 'Session-Based';
    membershipObjective: string[];
    keyFeatures: string[];
    period?: number;
    planPrice?: number;
    sessionCount?: number;
    sessionPrice?: number;
    validity?: number;
    paymentID?: string;
}

export interface PackageHistoryItem {
    packageID?: string;
    id?: string;
    pkgName?: string;
    planName?: string;
    price?: number;
    validity?: number;
    maxUser?: number;
    planPayment?: {
        status: 'active' | 'expired' | 'upcoming';
    };
    planStatus?: string;
}

export interface MembershipPlan {
    ID?: string;
    id?: string;
    _id?: string;
    planID?: string;
    name?: string;
    membershipName?: string;
    planName?: string;
    price?: number;
    validity?: number;
    duration?: number;
    maxUsers?: number;
    membershipObjective?: string[];
    objective?: string[];
    keyFeatures?: string[];
    membershipType?: 'Period-Based' | 'Session-Based';
    durationDetails?: {
        period?: number;
        periodPrice?: number;
        sessionCount?: number;
        sessionPrice?: number;
        validity?: number;
    };
    paymentID?: string;
}

export interface PlanFormData {
    membershipName: string;
    selectedObjectives: string[];
    accessibleFeatures: string[];
    membershipType: 'Period-Based' | 'Session-Based';
    period: string;
    planPrice: string;
    sessionCount: string;
    sessionPrice: string;
    validity: string;
    onlinePaymentConsents: string[];
}

export interface ReviewCardProps {
    name: string;
    date: string;
    rating: number;
    comment: string;
    avatar: string;
}

export interface TrainerCardProps {
    name: string;
    role: string;
    expertise: string[];
    avatar: string;
}

export interface SlotType {
    id: string;
    status: 'locked' | 'filled';
    trainer?: {
        ID: string;
        name: string;
        expertise: string;
        email: string;
    };
}
