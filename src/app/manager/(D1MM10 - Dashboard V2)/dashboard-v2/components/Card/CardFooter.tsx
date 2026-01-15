import styles from './Card.module.css';
import Image from "next/image";

import downArrowIcon from '../../icons/down-arrow.svg';
import upArrowIcon from '../../icons/up-arrow.svg';

type CardFooterProps = {
  percentage: number,
  comparison: string,
  status?: 'up' | 'down'
}
export default function CardFooter({ percentage, comparison, status = 'up' }: CardFooterProps) {
  return (
    <footer className={styles.footer}>
      <Image src={status === 'up' ? upArrowIcon : downArrowIcon} alt='down arrow icon' height={8} width={7}></Image>
      <p>
        <span className={status === 'up' ? 'text-(--bodyfill-primary-green)' : 'text-(--bodytext-warning-red'}>{percentage}%</span>
        <span> {comparison}</span>
      </p>
    </footer >
  )
};
