'use client';
import React, { useState } from 'react';
import { X, Link2, MessageCircle, Linkedin, Send, Share2 } from 'lucide-react';
import styles from './SharePopup.module.css';

interface SharePopupProps {
    isOpen: boolean;
    onClose: () => void;
    shareLink: string;
}

const SharePopup: React.FC<SharePopupProps> = ({ isOpen, onClose, shareLink }) => {

    if (!isOpen) return null;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareLink);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleShareVia = (platform: string) => {
        const encodedLink = encodeURIComponent(shareLink);
        const text = encodeURIComponent('Check out this membership plan!');

        let url = '';
        switch (platform) {
            case 'whatsapp':
                url = `https://wa.me/?text=${text}%20${encodedLink}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;
                break;
            case 'telegram':
                url = `https://t.me/share/url?url=${encodedLink}&text=${text}`;
                break;
            case 'other':
                // Use Web Share API if available
                if (navigator.share) {
                    navigator.share({
                        title: 'Membership Plan',
                        text: 'Check out this membership plan!',
                        url: shareLink,
                    }).catch((error) => console.log('Error sharing', error));
                    return;
                }
                break;
        }

        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    <X size={16} />
                </button>

                <div className={styles.heading}>
                    <h2 className={styles.title}>Invite via Sharing Link</h2>
                    <p className={styles.subtitle}>Share through the channel given below</p>
                </div>

                <div className={styles.linkCopyContainer}>
                    <div className={styles.linkWrapper}>
                        <Link2 size={22} className={styles.linkIcon} />
                        <input
                            type="text"
                            value={shareLink}
                            readOnly
                            className={styles.linkInput}
                        />
                    </div>
                    <button
                        onClick={handleCopyLink}
                        className={styles.copyButton}
                    >
                        Copy
                    </button>
                </div>

                <div className={styles.divider}>
                    <span className={styles.dividerText}>-------------- OR --------------</span>
                </div>

                <div className={styles.socialMediaContainer}>
                    <div className={styles.socialIconWrapper}>
                        <button
                            className={styles.socialIconButton}
                            onClick={() => handleShareVia('whatsapp')}
                        >
                            <MessageCircle size={16} />
                        </button>
                        <span className={styles.socialLabel}>WhatsApp</span>
                    </div>

                    <div className={styles.socialIconWrapper}>
                        <button
                            className={styles.socialIconButton}
                            onClick={() => handleShareVia('linkedin')}
                        >
                            <Linkedin size={16} />
                        </button>
                        <span className={styles.socialLabel}>LinkedIn</span>
                    </div>

                    <div className={styles.socialIconWrapper}>
                        <button
                            className={styles.socialIconButton}
                            onClick={() => handleShareVia('telegram')}
                        >
                            <Send size={16} />
                        </button>
                        <span className={styles.socialLabel}>Telegram</span>
                    </div>

                    <div className={styles.socialIconWrapper}>
                        <button
                            className={styles.socialIconButton}
                            onClick={() => handleShareVia('other')}
                        >
                            <Share2 size={16} />
                        </button>
                        <span className={styles.socialLabel}>Other</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharePopup;
