'use client';
import styles from './Heading.module.css'

interface HeadingProps {
  description: string
}

export default function Heading({ description }: HeadingProps) {
  return (
    <>
      <section className={styles.heading}>
        <h2>
          <span className={styles.highlight}>Manage </span>
          <span>Your </span>
          <span className={styles.highlight}>Plan</span>
        </h2>
        <p>{description}</p>
      </section>
    </>
  )
};