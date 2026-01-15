'use client';
import React, { useState } from 'react';
import PrimaryButton from '@/globalComponents/buttons/primaryButton/PrimaryButton';
import styles from './TrainerDetailsPopup.module.css';

interface TrainerDetailsPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
    trainerData: {
        name: string;
        gender: 'male' | 'female';
        phone: string;
        expertise: string;
        description?: string;
        yearOfExperience?: string;
        certificationTitle?: string;
        affiliatedInstitute?: string;
        dateOfRecognition?: string;
    };
}

const TrainerDetailsPopup: React.FC<TrainerDetailsPopupProps> = ({
    isOpen,
    onClose,
    onEdit,
    onDelete,
    trainerData
}) => {
    if (!isOpen) return null;

    const profileImage = trainerData.gender === 'male' ? '/plan/Male.svg' : '/plan/Female.svg';

    let formattedExpertise = trainerData.expertise;

    if (Array.isArray(trainerData.expertise)) {
        formattedExpertise = trainerData.expertise.join(', ');
    }
    else if (typeof trainerData.expertise === 'string' && trainerData.expertise.startsWith('[')) {
        try {
            const parsed = JSON.parse(trainerData.expertise);
            formattedExpertise = Array.isArray(parsed) ? parsed.join(', ') : trainerData.expertise;
        } catch {
            formattedExpertise = trainerData.expertise;
        }
    }

    const expertiseList = formattedExpertise.split(',').map(e => e.trim());
    const [activeTab, setActiveTab] = useState("expertise");

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>

                <div className={styles.content}>
                    <div className={styles.header}>
                        <div className={styles.avatarContainer}>
                            <img
                                src={profileImage}
                                alt="Trainer Avatar"
                                className={styles.avatar}
                            />
                        </div>
                        <p className={styles.trainerId}>ID 122354</p>
                        <h2 className={styles.trainerName}>{trainerData.name}</h2>
                        <p className={styles.role}>Owner/Coach</p>
                        <p className={styles.description}>
                            {trainerData.description ||
                                `With over ${trainerData.yearOfExperience || '5'} years of experience in personal training, I specialize in strength training, weight management, and injury rehabilitation.`}
                        </p>
                    </div>


                    <div className={styles.actions}>
                        <button className={styles.deleteButton} onClick={onDelete}>
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                                <path d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64999 4.2 4.81665L2.5 4.98332" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7.08331 4.14167L7.26665 3.05001C7.39998 2.25834 7.49998 1.66667 8.90831 1.66667H11.0916C12.5 1.66667 12.6083 2.29167 12.7333 3.05834L12.9166 4.14167" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15.7084 7.61667L15.1667 16.0083C15.075 17.3167 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3167 4.83335 16.0083L4.29169 7.61667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button className={styles.editButton} onClick={onEdit}>
                            Edit
                        </button>
                        <div className={styles.callNowWrapper}>
                            <PrimaryButton
                                onClick={() => {
                                    if (trainerData.phone) {
                                        window.location.href = `tel:${trainerData.phone}`;
                                    }
                                }}
                                colorVariant="primary-green"
                            >
                                Call Now
                            </PrimaryButton>

                        </div>
                    </div>

                    <div className={styles.tabs}>
                        <button
                            className={`${styles.tab} ${activeTab === "expertise" ? styles.activeTab : ""}`}
                            onClick={() => setActiveTab("expertise")}
                        >
                            Expertise
                        </button>

                        <button
                            className={`${styles.tab} ${activeTab === "achievements" ? styles.activeTab : ""}`}
                            onClick={() => setActiveTab("achievements")}
                        >
                            Achievements
                        </button>
                    </div>

                    {activeTab === "expertise" && (
                        <div className={styles.expertiseList}>
                            {expertiseList.map((item, index) => (
                                <div key={index} className={styles.expertiseItem}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "achievements" && (
                        <div className={styles.achievementsList}>
                            <div className={styles.achievementRow}>
                                <div className={styles.achievementLabel}>Title of certification</div>
                                <div className={styles.achievementValue}>{trainerData.certificationTitle || ''}</div>
                            </div>
                            <div className={styles.achievementRow}>
                                <div className={styles.achievementLabel}>Affiliated Institute</div>
                                <div className={styles.achievementValue}>{trainerData.affiliatedInstitute || ''}</div>
                            </div>
                            <div className={styles.achievementRow}>
                                <div className={styles.achievementLabel}>Date of Recognition</div>
                                <div className={styles.achievementValue}>{trainerData.dateOfRecognition || ''}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrainerDetailsPopup;
