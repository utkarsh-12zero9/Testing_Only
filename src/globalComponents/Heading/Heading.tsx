import styles from './Heading.module.css'

interface HeadingProps {
  title: string;
  description: string
}

export default function Heading({ title, description }: HeadingProps) {
  return (
    <section className={styles.heading}>
      <h2>{title}</h2>
      <p>{description}</p>
      <hr />
    </section>
  )
};