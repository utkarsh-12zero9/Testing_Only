import styles from './Card.module.css';

type CardFooterLinkProps = {
  text: string;
  link: string;
}
export default function CardFooterLink({ text, link }: CardFooterLinkProps) {
  return (
    <footer className={styles.footer} >
      <a href={link} className={styles.link}>{text} {'>'}</a>
    </footer>
  )
};
