"use client"
import styles from "./PaymentPop.module.css";
import Image from "next/image";
import Payment_logo from './icons/PaymentLogo.svg';
import { useState } from "react";

const PaymentPop = () => {
    const [isPaymentDone , setIsPaymentDone] = useState(true)
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.logo_container}  style={{ backgroundColor: isPaymentDone ? "rgb(86, 176, 60)" : "red" }}>
        <Image src={Payment_logo} alt="logo"/>
        </div>
        
        <h2>Payment Successful!</h2>
        <div className={styles.border}></div>
        <p>Please reach to your banking partner.</p>
        <button className={styles.button}  style={{ backgroundColor: isPaymentDone ? "rgb(86, 176, 60)" : "red" }}>Done</button>
      </div>
    </div>
  );
};

export default PaymentPop;