"use client";
import { useAppSelector } from "@/app/Redux/hooks";
import { selectBusinessData } from "@/app/Redux/slice/businessSlice/BusinessData";
import PrimaryButton from "@/globalComponents/buttons/primaryButton/PrimaryButton";
import InputBox from "@/globalComponents/inputs/inputBox/InputBox";
import PhoneInput from "@/globalComponents/inputs/phoneInputBox/PhoneInput";
import TextArea from "@/globalComponents/inputs/textArea/TextArea";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./ContactSection.module.css";
import ConfirmationModal from "./localComponents/confirmationModal/ConfirmationModal";
import Socials from "./localComponents/socials/Socials";

const MapComponent = dynamic(
  () => import("./localComponents/mapComponent/MapComponent"),
  { ssr: false }
);

interface BusinessData {
  email: string;
  phone: string;
  location?: [number, number];
}

function ContactSection() {
  const [isModalActive, setIsModalActive] = useState(false);
  const businessData = useAppSelector(
    selectBusinessData
  ) as BusinessData | null;
  const path = usePathname();

  const buttonName = path === "/" ? "Enquire Now" : "Submit";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    desc: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
  });

  const handleChange = ({ name, value, type }: { name: string, value: string, type?: string }) => {
    if (name === "name") {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(value)) {
        setFormErrors((prev) => ({
          ...prev,
          name: "Only letters and spaces are allowed",
        }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          name: "",
        }));
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.email || !formData.phone) {
        alert("Please fill in all required fields");
        return;
      }

      if (formErrors.name) {
        alert("Please fix the errors before submitting");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert("Please enter a valid email address");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/webpage/connect`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            userName: formData.name,
            email: formData.email,
            phoneNumber: formData.phone,
            description: formData.desc,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit form");

      const data = await response.json();
      if (!data.success) throw new Error(data.message || "Submission failed");

      setFormData({ name: "", email: "", phone: "", desc: "" });
      setIsModalActive(true);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <div className={styles.contact} id="contactSection">
      <div className={styles.title}>
        <h1>Contact Us</h1>
        <p>
          Let&apos;s Get in<span> Touch</span>
        </p>
      </div>

      <hr className={styles.divider} />

      <div
        className={styles.contactBlock}
        style={{
          background: "url('/landingPageImages/contactSection/main.png')",
        }}
      >
        <div className={styles.left}>
          <div className={styles.moblieLocation}>
            <MapComponent
              location={
                businessData?.location
                  ? businessData.location
                  : [26.8489028, 80.7777007]
              }
            />
          </div>

          <h1>
            Contact <span>Us</span>
          </h1>
          <form className={styles.contactForm}>
            <InputBox
              label="Name"
              placeholder="Enter your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={formErrors.name}
            />
            <InputBox
              label="Email"
              placeholder="user@email.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <PhoneInput
              code="+91"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextArea
              label="Add Description"
              placeholder="Enter Brief Description"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
            />
            <PrimaryButton onClick={handleSubmit}>{buttonName}</PrimaryButton>
          </form>
        </div>

        <div className={styles.right}>
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <MapComponent
              location={
                businessData?.location
                  ? businessData.location
                  : [26.8489028, 80.7777007]
              }
            />
            <div className={styles.socialsContainer}>
              <Socials />
            </div>
          </div>
        </div>
      </div>

      {
        isModalActive && (
          <ConfirmationModal setIsModalActive={setIsModalActive} />
        )
      }
    </div >
  );
}

export default ContactSection;
