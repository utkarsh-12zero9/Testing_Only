'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './ExtraInfo.module.css';
import { getTrainerProfileByPlanID } from '../../../../services/trainerService';
import { useSearchParams } from 'next/navigation';
import { TrainerCardProps } from '../../../../types';

interface TrainerProfile {
    ID: string;
    name: string;
    gender: string;
    age: number;
    desc: string;
    expertise: string[];
    profilePicture?: {
        path: string;
        originalName: string;
    };
}

const TrainerCard = ({ name, role, expertise, avatar }: TrainerCardProps) => (
    <div className={styles.trainerCard}>
        <div className={styles.trainerAvatar}>
            <Image src={avatar || "/plan/Male.svg"} alt={name} width={40} height={40} className={styles.avatarImg} />
        </div>
        <div className={styles.trainerInfo}>
            <div className={styles.trainerHeader}>
                <h4 className={styles.trainerName}>{name}</h4>
            </div>
            <div className={styles.roleHeader}>
                <span className={styles.trainerRole}>{role}</span>
                <span className={styles.roleDivider}>|</span>
                <div className={styles.expertiseList}>
                    {expertise.map((exp: string, i: number) => (
                        <span key={i} className={styles.expertiseTag}>{exp}</span>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default function TrainersView() {
    const [trainers, setTrainers] = useState<TrainerCardProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const planID = searchParams.get('planId');
                if (!planID) {
                    console.error('No planID found in query params');
                    setIsLoading(false);
                    return;
                }

                const response = await getTrainerProfileByPlanID(planID);

                if (response.success && response.data?.trainerProfiles) {
                    const trainerProfiles = response.data.trainerProfiles;

                    const formattedTrainers = trainerProfiles.map((trainer: TrainerProfile) => {
                        let expertiseArray: string[] = [];
                        if (trainer.expertise && Array.isArray(trainer.expertise)) {
                            expertiseArray = trainer.expertise.flatMap((exp: string) => {
                                try {
                                    const parsed = JSON.parse(exp);
                                    return Array.isArray(parsed) ? parsed : [exp];
                                } catch {
                                    return [exp];
                                }
                            });
                        }

                        let avatar = "/plan/Male.svg";
                        if (trainer.profilePicture?.path) {
                            avatar = trainer.profilePicture.path;
                        } else if (trainer.gender?.toLowerCase() === 'female') {
                            avatar = "/plan/Female.svg";
                        }

                        return {
                            name: trainer.name,
                            role: "Coach",
                            expertise: expertiseArray.length > 0 ? expertiseArray : ["General Fitness"],
                            avatar: avatar
                        };
                    });

                    setTrainers(formattedTrainers);
                }
            } catch (error) {
                console.error('Error fetching trainer profiles:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrainers();
    }, [searchParams]);

    if (isLoading) {
        return (
            <div className={styles.trainersCardContainer} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Loading trainers...</p>
            </div>
        );
    }

    if (trainers.length === 0) {
        return (
            <div className={styles.trainersCardContainer} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>No trainers assigned to this plan yet.</p>
            </div>
        );
    }

    return (
        <div className={styles.trainersCardContainer}>
            {trainers.map((trainer, i) => (
                <TrainerCard key={i} {...trainer} />
            ))}
        </div>
    );
}