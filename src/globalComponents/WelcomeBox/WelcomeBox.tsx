import PrimaryButton from '../buttons/primaryButton/PrimaryButton';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './WelcomeBox.module.css';
const BUTTON_TEXT = [
  "Complete Your Profile",
  "Verify Yourself",
  "Create Your Plan",
  "Create Website"
]
interface WelcomeBoxProps {
  progress: number,
  onClick: () => void
}
export default function WelcomeBox({ progress, onClick }: WelcomeBoxProps) {
  return (
    <div className={styles.welcomeBox}>
      <h2 className={styles.title}>Welcome Back!</h2>
      <p className={styles.subtitle}>You are One-Step Closer to creating your App.</p>
      <div className={styles.progressContainer}>
        <ProgressBar currentStep={progress - 1} />
        <p className={styles.progress}>{Math.round((progress / 5) * 100)}%</p>
      </div>
      <PrimaryButton onClick={onClick} className="w-full">
        {BUTTON_TEXT[progress - 1] || 'Loading'}
      </PrimaryButton>
    </div>
  )
};
