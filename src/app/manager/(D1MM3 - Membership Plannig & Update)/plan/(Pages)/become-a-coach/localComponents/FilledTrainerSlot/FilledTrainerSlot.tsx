'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './FilledTrainerSlot.module.css';

interface FilledTrainerSlotProps {
    trainerName: string;
    expertise: string;
    gender: 'male' | 'female';
    trainerId?: string;
    isSelected?: boolean;
    onSelect?: (trainerId: string) => void;
    onViewDetails: () => void;
}

const FilledTrainerSlot: React.FC<FilledTrainerSlotProps> = ({
    trainerName,
    expertise,
    gender,
    trainerId,
    isSelected = false,
    onSelect,
    onViewDetails
}) => {
    const [profileImage, setProfileImage] = useState<string>(
        gender === 'male' ? '/plan/Male.svg' : '/plan/Female.svg'
    );

    useEffect(() => {
        const newImage = gender === 'male' ? '/plan/Male.svg' : '/plan/Female.svg';
        setProfileImage(newImage);
    }, [gender]);

    const formattedExpertise = React.useMemo(() => {
        if (Array.isArray(expertise)) {
            return expertise.join(', ');
        }
        if (typeof expertise === 'string' && expertise.startsWith('[')) {
            try {
                const parsed = JSON.parse(expertise);
                return Array.isArray(parsed) ? parsed.join(', ') : expertise;
            } catch {
                return expertise;
            }
        }
        return expertise;
    }, [expertise]);

    const handleSlotClick = () => {
        if (onSelect && trainerId) {
            onSelect(trainerId);
        }
    };

    const handleViewDetails = (e: React.MouseEvent) => {
        e.stopPropagation();
        onViewDetails();
    };

    return (
        <div
            className={`${styles.filledSlot} ${isSelected ? styles.filledSlotSelected : ''}`}
            onClick={handleSlotClick}
        >
            <div className={styles.iconContainer}>
                <img
                    src={profileImage}
                    alt="Profile"
                    width={24}
                    height={24}
                    className={styles.userIcon}
                />
            </div>

            <div className={styles.details}>
                <h3 className={styles.trainerName}>{trainerName}</h3>
                <div className={styles.metaInfo}>
                    <span className={styles.role}>Coach</span>
                    <span className={styles.expertise}>{formattedExpertise}</span>
                </div>
            </div>

            <ChevronRight
                size={24}
                className={styles.arrow}
                onClick={handleViewDetails}
            />
        </div>
    );
};

export default FilledTrainerSlot;



