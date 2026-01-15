'use client';
import React, { useMemo, memo, useState, useRef } from 'react';
import { BsCameraFill } from 'react-icons/bs';
import { TbFileText } from "react-icons/tb";
import styles from './TrainerProfileForm.module.css';
import InputBox from '@/globalComponents/inputs/inputBox/InputBox';
import PhoneInput from '@/globalComponents/inputs/phoneInputBox/PhoneInput';
import DatePicker from '@/globalComponents/inputs/DatePicker/DatePicker';
import RadioBox from '@/globalComponents/inputs/radioBox/RadioBox';
import Dropdown from '@/globalComponents/inputs/Dropdown/Dropdown';
import TextArea from '@/globalComponents/inputs/textArea/TextArea';
import CheckMark from '@/globalComponents/inputs/CheckMark/CheckMark';
import PrimaryButton from '@/globalComponents/buttons/primaryButton/PrimaryButton';
import { Option } from '@/globalComponents/inputs/types';

export interface FormData {
    registerYourself: boolean;
    fullName: string;
    phone: string;
    email: string;
    yearOfExperience: string;
    dateOfBirth: string;
    gender: string;
    trainerExpertise: string;
    description: string;
    certificationTitle: string;
    affiliatedInstitute: string;
    dateOfRecognition: string;
}

export interface FormErrors {
    [key: string]: string;
}

export interface UploadedFile {
    id: string;
    name: string;
    size: number;
    progress: number;
    isUploading: boolean;
    uploadSpeed: number;
    startTime: number;
    file?: File;
}

interface TrainerProfileFormProps {
    formData: FormData;
    errors: FormErrors;
    handleChange: (params: { name: string; value: string | boolean; type?: string }) => void;
    expertiseOptions: Option[];
    profilePhotos: UploadedFile[];
    setProfilePhotos: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
    recognitionProof: UploadedFile[];
    setRecognitionProof: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
}

const TrainerProfileForm = memo(({
    formData,
    errors,
    handleChange,
    expertiseOptions,
    profilePhotos,
    setProfilePhotos,
    recognitionProof,
    setRecognitionProof
}: TrainerProfileFormProps) => {

    const genderOptions: Option[] = useMemo(() => [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'others', label: 'Others' },
    ], []);

    // Helper function to format file size
    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    // Helper function to calculate and format time remaining
    const formatTimeRemaining = (file: UploadedFile): string => {
        if (file.progress >= 100) return '0 Sec';

        const remainingProgress = 100 - file.progress;
        const elapsedTime = (Date.now() - file.startTime) / 1000; // seconds
        const timePerPercent = file.progress > 0 ? elapsedTime / file.progress : 0;
        const remainingSeconds = Math.ceil(timePerPercent * remainingProgress);

        if (remainingSeconds < 60) {
            return `${remainingSeconds} Sec`;
        } else {
            const minutes = Math.ceil(remainingSeconds / 60);
            return `${minutes} Min`;
        }
    };

    // Simulate upload progress
    const simulateUpload = (fileId: string, setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>) => {
        const interval = setInterval(() => {
            setFiles(prev => prev.map(file => {
                if (file.id === fileId && file.isUploading) {
                    const newProgress = Math.min(file.progress + 10, 100);
                    return {
                        ...file,
                        progress: newProgress,
                        isUploading: newProgress < 100
                    };
                }
                return file;
            }));
        }, 500);

        setTimeout(() => clearInterval(interval), 5500);
    };

    const handleFileSelect = (files: FileList | null, setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>) => {
        if (!files) return;

        const newFiles: UploadedFile[] = Array.from(files).map(file => {
            const uploadSpeed = 100 + Math.random() * 400;

            return {
                id: Math.random().toString(36).substr(2, 9),
                name: file.name,
                size: file.size,
                progress: 0,
                isUploading: true,
                uploadSpeed: uploadSpeed,
                startTime: Date.now(),
                file: file
            };
        });

        setFiles(prev => [...prev, ...newFiles]);
        newFiles.forEach(file => simulateUpload(file.id, setFiles));
    };

    const handleFileRemove = (fileId: string, setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>) => {
        setFiles(prev => prev.filter(file => file.id !== fileId));
    };
    const FileUploadSection = ({ label, files, setFiles, error }: {
        label: string;
        files: UploadedFile[];
        setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
        error?: string;
    }) => {
        const fileInputRef = useRef<HTMLInputElement>(null);
        const cameraInputRef = useRef<HTMLInputElement>(null);


        return (
            <div className={styles.formGroup}>
                <label className={styles.label}>{label}</label>
                {error && <span className={styles.error}>{error}</span>}
                <div className={`${styles.uploadContainer} ${files.length > 0 ? styles.uploadContainerWithFiles : ''}`}>
                    {files.length > 0 ? (
                        <div className={styles.uploadedLayout}>
                            <div className={styles.addMoreSection}>
                                <button
                                    type="button"
                                    className={styles.addMoreButton}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    Add More
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className={styles.hiddenInput}
                                    onChange={(e) => handleFileSelect(e.target.files, setFiles)}
                                />
                            </div>

                            <div className={styles.filesGrid}>
                                {files.map(file => (
                                    <div key={file.id} className={styles.fileCard}>
                                        {file.isUploading ? (
                                            <>
                                                <div className={styles.fileCardHeader}>
                                                    <TbFileText size={20} className={styles.fileIcon} />
                                                    <span className={styles.fileName}>
                                                        {file.name.length > 10 ? file.name.substring(0, 10) + '...' : file.name}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className={styles.removeButton}
                                                        onClick={() => handleFileRemove(file.id, setFiles)}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>

                                                <div className={styles.uploadProgressContent}>
                                                    <div className={styles.progressInfo}>
                                                        <span className={styles.progressText}>⏱ Time left: {formatTimeRemaining(file)}</span>
                                                        <span className={styles.progressText}>📄 Size: {formatFileSize(file.size)}</span>
                                                    </div>
                                                    <div className={styles.progressBarContainer}>
                                                        <div className={styles.progressBar}>
                                                            <div
                                                                className={styles.progressFill}
                                                                style={{ width: `${file.progress}%` }}
                                                            />
                                                        </div>
                                                        <span className={styles.progressPercent}>{file.progress}%</span>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className={styles.fileCardHeader}>
                                                    <TbFileText size={20} className={styles.fileIcon} />
                                                    <span className={styles.fileName}>
                                                        {file.name.length > 5 ? file.name.substring(0, 5) + '...' : file.name}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className={styles.removeButton}
                                                        onClick={() => handleFileRemove(file.id, setFiles)}
                                                    >
                                                        x
                                                    </button>
                                                </div>

                                                <div className={styles.filePreview}>
                                                    <TbFileText size={20} className={styles.previewIcon} />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            <PrimaryButton
                                type="button"
                                onClick={() => cameraInputRef.current?.click()}
                                colorVariant="primary-green"
                            >
                                <BsCameraFill size={20} /> Open Camera
                            </PrimaryButton>
                            <input
                                ref={cameraInputRef}
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className={styles.hiddenInput}
                                onChange={(e) => handleFileSelect(e.target.files, setFiles)}
                            />
                            <span className={styles.orText}>Or</span>
                            <label className={styles.uploadLinkButton}>
                                Choose from <span className={styles.galleryText}>Gallery</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className={styles.hiddenInput}
                                    onChange={(e) => handleFileSelect(e.target.files, setFiles)}
                                />
                            </label>
                        </>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <div className={styles.checkmarkSection}>
                <CheckMark
                    name="registerYourself"
                    value={formData.registerYourself}
                    onChange={handleChange}
                />
                <span className={styles.checkmarkLabel}>Register Yourself as a Coach/Trainer</span>
            </div>

            <InputBox
                name="fullName"
                value={formData.fullName}
                error={errors.fullName}
                onChange={handleChange}
                label="Full Name"
                placeholder="Enter the Full Name"
            />

            <PhoneInput
                code="+91"
                name="phone"
                value={formData.phone}
                error={errors.phone}
                onChange={handleChange}
            />

            {!formData.registerYourself && (
                <InputBox
                    name="email"
                    value={formData.email}
                    error={errors.email}
                    onChange={handleChange}
                    label="Email"
                    placeholder="user@email.com"
                    optional="Optional"
                />
            )}

            <InputBox
                name="yearOfExperience"
                value={formData.yearOfExperience}
                error={errors.yearOfExperience}
                onChange={handleChange}
                label="Year of Experience"
                placeholder="Enter your year of Experience"
            />

            <FileUploadSection
                label="Profile Photo (At least 4 images)"
                files={profilePhotos}
                setFiles={setProfilePhotos}
                error={errors.profilePhotos}
            />

            <DatePicker
                name="dateOfBirth"
                label="Date of Birth"
                date={formData.dateOfBirth}
                error={errors.dateOfBirth}
                onChange={handleChange}
            />

            <RadioBox
                name="gender"
                value={formData.gender}
                error={errors.gender}
                onChange={handleChange}
                label="Select Gender"
                options={genderOptions}
                optional="Optional"
            />

            <Dropdown
                name="trainerExpertise"
                value={formData.trainerExpertise}
                error={errors.trainerExpertise}
                onChange={handleChange}
                label="Trainer's Expertise"
                placeholder="Select all the expertise"
                options={expertiseOptions}
            />

            <TextArea
                name="description"
                value={formData.description}
                error={errors.description}
                onChange={handleChange}
                label="Add Description"
                placeholder="Enter Brief Description about Your Trainer"
            />

            <div className={styles.infoSection}>
                <label className={styles.label}>
                    Any Certification, Or Recognition <span className={styles.optional}>(Optional)</span>
                </label>
                <p className={styles.infoText}>
                    Enter details about relevant certification or Recognition awarded by a recognized institute with publishing date to strengthen your profile.
                </p>
            </div>

            <InputBox
                name="certificationTitle"
                value={formData.certificationTitle}
                error={errors.certificationTitle}
                onChange={handleChange}
                label="Title of certification, Award or Recognition"
                placeholder="Title of certification"
            />

            <InputBox
                name="affiliatedInstitute"
                value={formData.affiliatedInstitute}
                error={errors.affiliatedInstitute}
                onChange={handleChange}
                label="Affiliated Institute"
                placeholder="Type Your Institute Name"
            />

            <DatePicker
                name="dateOfRecognition"
                label="Date of Recognition"
                date={formData.dateOfRecognition}
                error={errors.dateOfRecognition}
                onChange={handleChange}
            />

            <FileUploadSection
                label="Upload Proof of Recognition"
                files={recognitionProof}
                setFiles={setRecognitionProof}
            />
        </>
    );
});

TrainerProfileForm.displayName = 'TrainerProfileForm';

export default TrainerProfileForm;
