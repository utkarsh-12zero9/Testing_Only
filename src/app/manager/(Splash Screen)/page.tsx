'use client';
import { useManagerSelector } from '../Redux/hooks';
import { selectManagerProgress } from '../Redux/slice/manager-slice';
import { useEffect } from 'react';

export default function Page() {
    const managerProgress = useManagerSelector(selectManagerProgress);

    useEffect(() => {
        if (managerProgress === null || managerProgress === undefined) return;

        if (managerProgress === 0) {
            window.location.href = "/manager/accountSetup";
        } else {
            window.location.href = "/manager/dashboard";
        }
    }, [managerProgress]);

    return null;
}