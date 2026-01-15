import Image from 'next/image';
import { LoginType, Role } from '../../types';
import styles from './PopUp.module.css';

// icons
import FaceBook_icon from '../../icons/facebook.svg';
import LinkedIn_icon from '../../icons/linkedIn.svg';
import Google_icon from '../../icons/goggle.svg';

interface PopupProps {
  role: Role;
  onClose: () => void
}
export default function PopUp({ role, onClose }: PopupProps) {
  function handleLogin(loginType: LoginType) {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${loginType}/${role}`;
  }

  return (
    <div className={styles.mainArea}>
      <div className={styles.modalOverlay} >
        <div onClick={onClose}>
          <div className={styles.main_container} onClick={(e) => e.stopPropagation()}>
            <div className={styles.top_container}>
              <h3>Hi there!</h3>
              <br />
              <p>Sign in to keep things running smoothly.</p>
              <br />
              <div className={styles.hr}></div>
              <br />
            </div>
            <div className={styles.bottom_container}>
              <div className={styles.login_ways} onClick={() => handleLogin("google")}>
                <Image src={Google_icon} alt="Google Icon" className={styles.icons} />
                <p>Continue with Google</p>
              </div>
              <div className={styles.login_ways} onClick={() => handleLogin("linkedin")}>
                <Image src={LinkedIn_icon} alt="LinkedIn Icon" className={styles.icons} />
                <p>Continue with LinkedIn</p>
              </div>
              <div className={styles.login_ways} onClick={() => handleLogin("facebook")}>
                <Image src={FaceBook_icon} alt="Facebook Icon" className={styles.icons} />
                <p>Continue with Facebook</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
