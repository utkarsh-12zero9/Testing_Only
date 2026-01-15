import styles from "./page.module.css";
import Form from "./components/Form";
import Heading from "@/globalComponents/Heading/Heading";

export default function Page() {
    return (
        <div className={styles.container}>
            <div className={styles.mainArea}>
                <Heading
                    title="Let's Begin"
                    description="Create your account to start your journey."
                />
                <div className={styles.blurWrapper}>
                    <div className={styles.blurBackground}></div>
                    <div className={styles.content}>
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    )
}