'use client';
import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingPage from '@/globalComponents/LoadingPage/LoadingPage';

function BusinessRedirect() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {

        const token = searchParams.get('token');
        const userID = searchParams.get('userID');

        if (token) {
            localStorage.setItem('token', token);
        }

        if (userID) {
            localStorage.setItem('userID', userID);
        }

        const businessID = localStorage.getItem('businessID');

        if (businessID) {
            router.push(`/business/${businessID}`);
        } else {
            router.push(`/`);
        }
    });

    return (
        <LoadingPage />
    );
}

export default function Page() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <BusinessRedirect />
        </Suspense>
    );
}