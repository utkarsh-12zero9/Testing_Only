'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingPage from '@/globalComponents/LoadingPage/LoadingPage';

export default function Page() {
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
       <LoadingPage/>
    );
}