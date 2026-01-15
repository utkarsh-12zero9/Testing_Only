import React from 'react';
import styles from './ExtraInfo.module.css';

interface TagsViewProps {
    tags: string[];
}

export default function TagsView({ tags }: TagsViewProps) {
    if (!tags || tags.length === 0) {
        return <div style={{ color: 'white', opacity: 0.5, fontSize: '12px' }}>No items found.</div>;
    }

    return (
        <div className={styles.tagsContainer}>
            <div className={styles.tagsGrid}>
                {tags.map((tag, i) => (
                    <div key={i} className={styles.tagChip}>
                        {tag}
                    </div>
                ))}
            </div>
        </div>
    );
}
