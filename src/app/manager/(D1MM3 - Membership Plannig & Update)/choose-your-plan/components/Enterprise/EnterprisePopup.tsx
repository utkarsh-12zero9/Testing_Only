"use client";

import { useState } from "react";
import styles from "./EnterprisePopup.module.css";
import PhoneInput from "@/globalComponents/inputs/phoneInputBox/PhoneInput";
import Dropdown from "@/globalComponents/inputs/Dropdown/Dropdown";
import TextArea from "@/globalComponents/inputs/textArea/TextArea";
import PrimaryButton from "@/globalComponents/buttons/primaryButton/PrimaryButton";
import SuccessPopup from "../Success/Success";

interface Props {
  onClose: () => void;
}

export default function EnterprisePopup({ onClose }: Props) {
  const [phone, setPhone] = useState<string>("");
  const [timing, setTiming] = useState<string>("");
  const [requirements, setRequirements] = useState<string>("");
  const [errors, setErrors] = useState({
    phone: "",
    timing: "",
    requirements: "",
  });
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handlePhoneChange = (data: { name?: string; value: string }) => {
    setPhone(data.value ?? "");
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleTextAreaChange = (data: {
    name?: string;
    value: string;
    type?: string;
  }) => {
    setRequirements(data.value);
    if (errors.requirements) {
      setErrors((prev) => ({ ...prev, requirements: "" }));
    }
  };

  const timeOptions = [
    { label: "00:00 AM", value: "00:00 AM" },
    { label: "00:30 AM", value: "00:30 AM" },
    { label: "01:00 AM", value: "01:00 AM" },
    { label: "01:30 AM", value: "01:30 AM" },
    { label: "02:00 AM", value: "02:00 AM" },
    { label: "02:30 AM", value: "02:30 AM" },
    { label: "03:00 AM", value: "03:00 AM" },
    { label: "03:30 AM", value: "03:30 AM" },
    { label: "04:00 AM", value: "04:00 AM" },
    { label: "04:30 AM", value: "04:30 AM" },
    { label: "05:00 AM", value: "05:00 AM" },
    { label: "05:30 AM", value: "05:30 AM" },
    { label: "06:00 AM", value: "06:00 AM" },
    { label: "06:30 AM", value: "06:30 AM" },
    { label: "07:00 AM", value: "07:00 AM" },
    { label: "07:30 AM", value: "07:30 AM" },
    { label: "08:00 AM", value: "08:00 AM" },
    { label: "08:30 AM", value: "08:30 AM" },
    { label: "09:00 AM", value: "09:00 AM" },
    { label: "09:30 AM", value: "09:30 AM" },
    { label: "10:00 AM", value: "10:00 AM" },
    { label: "10:30 AM", value: "10:30 AM" },
    { label: "11:00 AM", value: "11:00 AM" },
    { label: "11:30 AM", value: "11:30 AM" },
  ];

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      phone: "",
      timing: "",
      requirements: "",
    };
    const digitsOnly = phone.replace(/\D/g, "");
    if (!digitsOnly || digitsOnly.length !== 10) {
      newErrors.phone = "Please enter a valid 10 digit mobile number";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setShowSuccess(true);
  };

  return (
    <>
      <div className={styles.popupContent}>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg
            className={styles.closeIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.textBox}>
          <span className={styles.heading}>Get your Enterprise Pack</span>
          <p className={styles.description}>
            Please share your preferred time and requirements, our team will get
            in touch to create the perfect solution for you.
          </p>
        </div>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <PhoneInput
            code="+91"
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
            error={errors.phone}
          />

          <Dropdown
            name="timing"
            value={timing}
            label="Preferred Timings"
            optional="Optional"
            placeholder="00:00 AM"
            options={timeOptions}
            onChange={({ value }) => {
              setTiming(value);
              if (errors.timing) {
                setErrors((prev) => ({ ...prev, timing: "" }));
              }
            }}
            error={errors.timing}
          />

          <TextArea
            name="requirements"
            value={requirements}
            label="Your Requirements"
            optional="Optional"
            placeholder="Share details about your business needs."
            onChange={handleTextAreaChange}
            error={errors.requirements}
          />
        </form>

        <PrimaryButton
          type="button"
          colorVariant="primary-green"
          onClick={handleSubmit}
        >
          Submit Your Query
        </PrimaryButton>
      </div>

      {showSuccess && (
        <SuccessPopup
          message="Your query has been submitted successfully!"
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  );
}
