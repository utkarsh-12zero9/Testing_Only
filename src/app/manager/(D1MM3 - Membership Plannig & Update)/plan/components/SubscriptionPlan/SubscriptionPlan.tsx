'use client';
import React, { useState, useEffect } from 'react';
import styles from './SubscriptionPlan.module.css';
import MembershipCard from '../MembershipCard/MembershipCard';

interface MembershipPlan {
    id: string;
    planName: string;
    price: number;
    duration: number;
    validity: number;
    maxUsers: number;
    status: 'Upcoming' | 'Active' | 'Expired';
}

interface SubscriptionPlanProps {
    memberships?: MembershipPlan[];
    maxSlots?: number;
}

const SubscriptionPlan: React.FC<SubscriptionPlanProps> = () => {
    const [memberships, setMemberships] = useState<MembershipPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPackagesFromLocalStorage = () => {
            try {
                setLoading(true);
                setError(null);

                // Read businessData from localStorage
                const businessDataStr = localStorage.getItem('businessData');
                if (!businessDataStr) {
                    setError('Business data not found in localStorage');
                    setLoading(false);
                    return;
                }

                const businessData = JSON.parse(businessDataStr);

                // Extract packageHistory array
                const packageHistory = businessData.packageHistory || [];

                if (!Array.isArray(packageHistory) || packageHistory.length === 0) {
                    console.log('No packages found in packageHistory');
                    setMemberships([]);
                    setLoading(false);
                    return;
                }

                console.log('Package History:', packageHistory);

                // Map packageHistory data directly to UI props (no API calls)
                const mappedPlans: MembershipPlan[] = packageHistory.map((pkg: any) => {
                    // Map fields from packageHistory data
                    const mappedPlan = {
                        id: pkg.packageID || pkg.id,
                        planName: pkg.pkgName || pkg.planName || 'Unknown Plan',
                        price: pkg.price || 0,
                        duration: pkg.validity || 0,
                        validity: pkg.validity || 0,
                        maxUsers: pkg.maxUser || 0,
                        status: deriveStatus(pkg)
                    };

                    console.log('📦 Mapped Package:', {
                        original: pkg,
                        mapped: mappedPlan
                    });

                    return mappedPlan;
                }).filter((plan) => plan.id); // Filter out any plans without IDs

                console.log('✅ Final Mapped Plans for Display:', mappedPlans);
                setMemberships(mappedPlans);
            } catch (err) {
                console.error('Error loading package data:', err);
                setError('An error occurred while loading package data');
            } finally {
                setLoading(false);
            }
        };

        loadPackagesFromLocalStorage();
    }, []);

    // Derive status from planPayment or business rules
    const deriveStatus = (packageData: any): 'Upcoming' | 'Active' | 'Expired' => {
        // If planPayment exists, use it to determine status
        if (packageData.planPayment) {
            const paymentStatus = packageData.planPayment.status;
            if (paymentStatus === 'active') return 'Active';
            if (paymentStatus === 'expired') return 'Expired';
            if (paymentStatus === 'upcoming') return 'Upcoming';
        }

        // Default business logic based on planStatus
        if (packageData.planStatus === 'Active') return 'Active';
        if (packageData.planStatus === 'Expired') return 'Expired';

        // Default to Active
        return 'Active';
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <h3 className={styles.title}>Your Subscription Plan:</h3>
                <div className={styles.plansGrid}>
                    <p style={{ color: 'var(--pure-white-50)' }}>Loading subscription plans...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <h3 className={styles.title}>Your Subscription Plan:</h3>
                <div className={styles.plansGrid}>
                    <p style={{ color: 'var(--warning-red)' }}>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={styles.container}>
                <h3 className={styles.title}>Your Subscription Plan:</h3>
                <div className={styles.plansGrid}>
                    {memberships.length > 0 ? (
                        memberships.map((membership) => (
                            <MembershipCard
                                key={membership.id}
                                planName={membership.planName}
                                price={membership.price}
                                duration={membership.duration}
                                validity={membership.validity}
                                maxUsers={membership.maxUsers}
                                status={membership.status}
                            />
                        ))
                    ) : (
                        <p style={{ color: 'var(--pure-white-50)' }}>No subscription plans found</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default SubscriptionPlan;
