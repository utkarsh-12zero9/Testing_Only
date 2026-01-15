/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "../logo/Logo";
import cross from "./icons/cross.svg";
import more from "./icons/more.svg";
import styles from "./styles/NavBar.module.css";

function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [showNavbar, setShowNavbar] = useState(true);
  // const [lastScrollY, setLastScrollY] = useState(0);
  const path = usePathname();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > lastScrollY) {
  //       setShowNavbar(false);
  //     } else {
  //       setShowNavbar(true);
  //     }
  //     setLastScrollY(window.scrollY);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [lastScrollY]);

  const url = typeof window !== "undefined" ? window.location.pathname : "";
  const pid = url ? url.split("/").pop() : "";

  const fetchData = async () => {
    if (!pid) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/plan/getMembershipPlan?planID=${pid}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      const firstBusinessID = result.data.membershipPlans[0]?.businessID;
      window.location.href = `/business/${firstBusinessID}`;
    } catch (error: any) {
      setError(error.message);
    }
  };
  console.log(error);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      fetchData();
    }
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.navBarContent}>
        <Link href="/" className={styles.logo}>
          <Logo />
          <p>{path === "/" ? "Membes" : "FlexFit"}</p>
        </Link>
        <ul className={styles.navBarLinks}>
          <li onClick={() => handleClick("servicesSection")}>Services</li>
          {path === "/" && (
            <li onClick={() => handleClick("usageSection")}>How it works?</li>
          )}
          <li onClick={() => handleClick("plansSection")}>Membership</li>
          {path !== "/" && (
            <li onClick={() => handleClick("trainersSection")}>Trainers</li>
          )}
          <li onClick={() => handleClick("contactSection")}>Contact us</li>
        </ul>
        <button
          className={styles.more}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <Image src={cross} alt="close" width={20} height={20} />
          ) : (
            <Image src={more} alt="more" width={20} height={20} />
          )}
        </button>
      </div>

      {isExpanded && (
        <>
          <hr className={styles.divider} />
          <ul className={styles.moreContent}>
            <li onClick={() => handleClick("servicesSection")}>Services</li>
            {path === "/" && (
              <li onClick={() => handleClick("usageSection")}>How it works?</li>
            )}
            <li onClick={() => handleClick("plansSection")}>Membership</li>
            {path !== "/" && (
              <li onClick={() => handleClick("trainersSection")}>Trainers</li>
            )}
            <li onClick={() => handleClick("contactSection")}>Contact us</li>
          </ul>
        </>
      )}
    </div>
  );
}

export default NavBar;
