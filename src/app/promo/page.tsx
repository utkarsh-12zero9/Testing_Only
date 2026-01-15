'use client'
import NavBar from '@/globalComponents/navBar/NavBar'
import styles from './page.module.css'
import PrimaryButton from '@/globalComponents/buttons/primaryButton/PrimaryButton'
import Feature from './localComponents/feature/Feature'
import fetures from './data/getFetureData'
import React from 'react'
import SecondaryButton from '@/globalComponents/buttons/secondaryButton/SecondaryButton'
import GetWindowDimensions from '@/lib/getDimensions'
import playStore from './promoPageIcons/playstore/playstore.svg'
import Image from 'next/image'

function page() {

    const dimension = GetWindowDimensions();

    const list = fetures.map((item, index) => (
        <React.Fragment key={index}>
            <Feature item={item} />
        </React.Fragment>
    ));

    return (
        <div className={styles.page}>
            <NavBar />

            <div className={styles.main} style={{
                background: "url('/paymentPageImages/main.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className={styles.overlay}>
                    <div className={styles.content} style={{
                        backgroundImage: dimension.width < 420 ? "url('/promoPageImages/mainPromoMobile.png')" : "",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}>
                        <div className={styles.header}>
                            <h1>Take Your Experience Anywhere with Our App!</h1>
                            <h2>Get faster access to features, exclusive deals, and seamless session tracking on the go.</h2>
                        </div>
                        <div className={styles.offer}>
                            <h3>Here&apos;s what you get with RABLO</h3>
                            <div className={styles.featureList}>
                                {list}
                            </div>
                        </div>
                        <div className={styles.cta}>
                            <SecondaryButton onClick={() => window.location.href = "/"}>Back</SecondaryButton>
                            <PrimaryButton onClick={() => window.location.href = "https://play.google.com/store/apps"}>
                                <Image src={playStore} alt='play-store-icon' />
                                <span>Download Now on Play Store</span>
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className={styles.image}>
                        <img src="/promoPageImages/mainPromo.png" alt="" className={styles.mainImage} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page