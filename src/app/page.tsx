'use client';
import styles from './page.module.css'

import Header from "./sections/headerSection/Header";
import TargetSection from "./sections/targetSection/TargetSection"; // copied from DefaultPage
import ServiceSection from "./sections/serviceSection/ServiceSection";
import CustomerSection from "./sections/customerSection/CustomerSection"; // copied from DefaultPage
import ObjectiveSection from "./sections/objectiveSection/ObjectiveSection"; // copied from DefaultPage
import UsageSection from "./sections/usageSection/UsageSection"; // copied from DefaultPage
import PlanSections from './sections/planSections/PlanSection'; // copied from DefaultPage
import ContactSection from "./sections/contactSection/ContactSection";

import FooterBar from "@/globalComponents/footerBar/FooterBar";

export default function Page() {
  return (
    <div className={styles.container}>
      <Header />
      <TargetSection />
      <ServiceSection />
      <CustomerSection />
      <ObjectiveSection />
      <UsageSection />
      <PlanSections />
      <ContactSection />
      <FooterBar />
    </div>
  );
}