'use client'
import NavBar from "@/globalComponents/navBar/NavBar"
import styles from './Header.module.css'
import PrimaryButton from "@/globalComponents/buttons/primaryButton/PrimaryButton"
import { useAppSelector } from "@/app/Redux/hooks"
import { selectBusinessData } from "@/app/Redux/slice/businessSlice/BusinessData"
import { usePathname } from "next/navigation"
import { memo } from "react"
import Image from "next/image"

const Header = memo(function Header() {
  const path = usePathname()
  const businessData = useAppSelector(selectBusinessData)

  const scrollToSection = () => {
    const section = document.getElementById("plansSection")
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  // Shared background style object to avoid duplication
  const backgroundStyle = {
    background: "url('/landingPageImages/headerSection/yoga.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  // Shared NavBar and wrapper structure
  const headerContent = (
    <div>
      <NavBar />
      <div className={styles.heroSection}>
        <div className={styles.heroSectionText}>
          <div className={styles.heroSectionTitle}>
            <hr />
            <h1>{path === '/' ? 'Membes App' : businessData?.businessName}</h1>
            <hr />
          </div>
          <div className={styles.heroSectionDescription}>
            <p>{path === '/' ? 'Dual-Interface Membership Management System' : businessData?.tagline}</p>
            <p>
              {path === '/'
                ? 'Our Gym Membership Management System is a B2B dual-interface platform designed to digitize gym operations. It provides solutions for establishing a strong digital presence, offering flexible membership options, and automating essential administrative tasks.'
                : `At ${businessData?.businessName}, we believe in empowering individuals to lead healthier and more fulfilling lives. Our tailored programs and state-of-the-art facilities are designed to help you achieve your fitness goals.`
              }
            </p>
            <PrimaryButton onClick={scrollToSection}>
              <Image src="/headerSection/topRightArrow.svg" alt="right-arrow-icon" width={16} height={16} />
              Get Started
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className={styles.header} style={backgroundStyle}>
      {headerContent}
    </div>
  )
})

export default Header