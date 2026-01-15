"use client";
import NavBar from "@/globalComponents/navBar/NavBar";
import ContactSection from "../sections/contactSection/ContactSection";
import FooterBar from "@/globalComponents/footerBar/FooterBar";
import Header from "../sections/headerSection/Header";
import ServiceSection from "../sections/serviceSection/ServiceSection";
import styles from "./Default.module.css";
import CustomerSection from "./sections/customerSection/CustomerSection";
import TargetSection from "./sections/targetSection/TargetSection";
import ObjectiveSection from "./sections/objectiveSection/ObjectiveSection";
import PlanSection from "./sections/planSection/PlanSection";
import UsageSection from "./sections/usageSection/UsageSection";

export default function Page() {
  return (
    <div className={styles.container}>
      <Header />
      <TargetSection />
      <ServiceSection />
      <CustomerSection />
      <ObjectiveSection />
      <UsageSection />
      <PlanSection />
      <ContactSection />
      <FooterBar />
    </div>
  );
}
