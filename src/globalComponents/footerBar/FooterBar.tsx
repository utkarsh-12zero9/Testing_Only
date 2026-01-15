'use client';
import { selectBusinessData } from '@/app/Redux/slice/businessSlice/BusinessData';
import styles from './FooterBar.module.css';
import { useAppSelector } from '@/app/Redux/hooks';
import React from 'react';
import Image from 'next/image'; 
import Logo from '../logo/Logo';
import { usePathname } from 'next/navigation';
import businessSocialLinks from './data/businessSocialLinks';
import facebook from './icons/faceBookIcon.svg'
import instagram from './icons/instagramIcon.svg'
import linkedin from './icons/linkedInIcon.svg'
import x from './icons/xIcon.svg'
import youtube from './icons/youtubeIcon.svg'

function FooterBar() {
    const businessData = useAppSelector(selectBusinessData);
    const socials = businessData?.socialMediaLinks || businessSocialLinks;
    
    const path = usePathname();

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const getSocialIcon = (type: string): string | null => {
        switch (type.toLowerCase()) {
            case 'facebook': return facebook;
            case 'instagram': return instagram;
            case 'twitter': return x; 
            case 'x': return x;
            case 'linkedin': return linkedin;
            case 'youtube': return youtube;
            default: return null; 
        }
    };

    const list = socials?.map((item, index) => {
        const iconSrc = getSocialIcon(item.platform);
        if (!iconSrc) return null; 

        return (
            <a key={index} href={item.link} target="_blank" rel="noopener noreferrer">
                <Image 
                    src={iconSrc} 
                    alt={`${item.platform} icon`} 
                    className={styles.socialIcon} 
                    width={30} 
                    height={30}
                />
            </a>
        );
    });

    return (
        <div className={styles.footerBar}>
            {/* Content */}
            <div className={styles.content}>
                {/* Logo */}
                <div className={styles.logo}>
                    <Logo/>
                    <p>{ path === '/' ? 'Membes' : 'FlexFit'}</p>
                </div>
                {/* Navigation */}
                <ul className={styles.links}>
                    <li onClick={() => handleClick("servicesSection")}>Services</li>
                    {path === '/' && <li onClick={() => handleClick("usageSection")}>How it works?</li>}
                    <li onClick={() => handleClick("plansSection")}>Membership</li>
                    {path !== '/' && <li onClick={() => handleClick("trainersSection")}>Trainers</li>}
                    <li onClick={() => handleClick("contactSection")}>Contact us</li>
                </ul>
                {/* Socials */}
                <div className={styles.socials}>
                    {list}
                </div>
            </div>
            {/* Credits */}
            <div className={styles.credits}>
                <hr className={styles.divider}/>
                <div className={styles.creditsText}>
                    <h1 className={styles.membes}>Powered by <span>Membes</span></h1>
                    <div>
                        <p>Privacy Policy</p>
                        <p>Terms of Service</p>
                        <p>Cookies Settings</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterBar;
