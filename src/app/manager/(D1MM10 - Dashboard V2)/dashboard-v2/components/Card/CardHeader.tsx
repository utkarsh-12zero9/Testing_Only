import Image from 'next/image';
import styles from './Card.module.css';

export default function CardHeader({ icon, title, iconColor }: { icon: string, title: string, iconColor?: string }) {
  return (
    <header className={styles.header}>
      <div
        className={styles.icon}
        style={iconColor ? { backgroundColor: iconColor } : {}}
      >
        <Image src={icon} alt='icon' height={12} width={12}></Image>
      </div>
      <p>{title}</p>
    </header>
  )
};
