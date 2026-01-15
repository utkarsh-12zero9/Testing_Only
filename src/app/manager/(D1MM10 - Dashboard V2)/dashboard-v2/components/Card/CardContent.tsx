import styles from './Card.module.css'

export default function CardContent({ number, numberColor, label }: { number: number, numberColor?: string, label: string }) {
  return (
    <main className={styles.mainContent}>
      <span style={numberColor ? { color: numberColor } : {}}>{number || 0}</span>
      <span>{label}</span>
    </main>
  )
};
