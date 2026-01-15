'use client';
import React from 'react';
import styles from './QuickInfo.module.css'

interface QuickInfoProps {
    icon: string;
    title: string;
    value: string | number;
    unit: string;
    subtitle?: string;
    iconBgColor?: string;
    valueColor?: string;
    subtitleColor?: string;
    subtitleClickable?: boolean;
    onSubtitleClick?: () => void;
    // Trend data
    trendDirection?: 'up' | 'down';
    trendPercentage?: number;
    trendColor?: string;
}

const QuickInfo: React.FC<QuickInfoProps> = ({
    icon,
    title,
    value,
    unit,
    subtitle,
    iconBgColor = 'var(--primary-green-black-4)',
    valueColor = 'var(--primary-green)',
    subtitleColor,
    subtitleClickable = false,
    onSubtitleClick,
    trendDirection,
    trendPercentage,
    trendColor = 'var(--warning-red)'
}) => {
    return (
        <div className={styles.quickInfo}>
            <div className={styles.title}>
                <div
                    className={styles.iconContainer}
                    style={{ backgroundColor: iconBgColor }}
                >
                    <img src={icon} className={styles.icon} alt={title} />
                </div>
                <p className={styles.titleText}>{title}</p>
            </div>

            <div className={styles.content}>
                <div className={styles.valueContainer}>
                    <h2
                        className={styles.value}
                        style={{ color: valueColor }}
                    >
                        {value}
                    </h2>
                    <p className={styles.unit}>{unit}</p>
                </div>

                {/* Trend info or subtitle */}
                {trendDirection && trendPercentage !== undefined ? (
                    <div className={styles.trendContainer}>
                        <img
                            src={trendDirection === 'down' ? '/plan/downArrow.svg' : '/plan/upArrow.svg'}
                            alt=""
                            className={styles.trendArrow}
                        />
                        <span className={styles.trendPercentage} style={{ color: trendColor }}>
                            {trendPercentage}%
                        </span>
                        <span className={styles.trendText}>{subtitle}</span>
                    </div>
                ) : subtitleClickable ? (
                    <button
                        className={styles.subtitleButton}
                        onClick={onSubtitleClick}
                        style={{ color: subtitleColor || 'var(--primary-green-black-0)' }}
                    >
                        {subtitle}
                    </button>
                ) : subtitle ? (
                    <p className={styles.subtitle} style={{ color: subtitleColor }}>
                        {subtitle}
                    </p>
                ) : null}
            </div>
        </div>
    )
}

export default QuickInfo;
