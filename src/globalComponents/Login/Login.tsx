// Developed By: Sanju
"use client";
import styles from "./Login.module.css";
import { useEffect, useState } from 'react';

import PrimaryButton from "@/globalComponents/buttons/primaryButton/PrimaryButton";
import { Role } from "./types";
import PopUp from "./component/PopUp/PopUp";

const Login = ({ role }: { role: Role }) => {
  const [isModalActive, setIsModalActive] = useState(false);

  const texts = ["Fitness Center", "Yoga Studio", "Wellness Center", "MMA & Boxing Hub", "Dance Studio", "Physiotherapy"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 1500); // changes every 2 seconds
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className={styles.container}>
      <div className={styles.mainArea}>
        {!isModalActive ? (
          <div>
            {
              role == "manager" ? (
                <div className={styles.textBox}>
                  <span className={styles.title}>Manage Your <br className="block md:hidden" />
                    <span className={styles.businessTagline}> {texts[index]} </span><br className="block md:hidden" />
                    with us!</span>
                  <br /><br />
                  <span className={styles.subTitle}>All your business operations in one place, ready for you to take charge.</span>
                </div>
              ) : (
                <div>
                  <span className={styles.title}>Achieve Your
                    <span className={styles.businessTagline}> Fitness Goals </span>
                    with us!</span>
                  <br /><br />
                  <span className={styles.subTitle}>Your journey to health, strength, and happiness starts here. Let’s make it happen together!</span>
                </div>
              )
            }

            <br /><div className={styles.hr}></div>
            <br />
            <PrimaryButton
              onClick={() => setIsModalActive(true)}
              className="w-full"
            >Get Started</PrimaryButton>
            <br />
          </div>
        ) : (
          <PopUp role={role} onClose={() => setIsModalActive(false)} />
        )}
      </div>
    </div>
  );
};

export default Login;
