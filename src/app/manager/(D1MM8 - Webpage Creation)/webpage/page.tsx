// Developed By: Sanju
'use client';
import HeaderManagerModule from '@/globalComponents/HeaderManager/ModuleHeader/ModuleHeader';
import styles from './page.module.css'
import Heading from '@/globalComponents/Heading/Heading';
import { useState } from 'react';
import ProgressBar from '@/globalComponents/ProgressBar/ProgressBar'

export default function Page() {
    const [currentPlan, setCurrentPlan] = useState(1)
    const planInfo = [
        {
            icon: "",
            name: "Trial",
            cost: 0,
            cycle: "No Auto Renewal",
            validity: 30,
            keyServices: "Upto 1",
            membership: "Upto 1",
            customBranding: false,
            trainerProfile: "",
            contactOptions: "Basic"
        },
        {
            icon: "",
            name: "Business",
            cost: 400,
            cycle: "Billed Quarterly",
            validity: 30,
            keyServices: "Unlimited",
            membership: "Unlimited",
            customBranding: true,
            trainerProfile: "Upto 6",
            contactOptions: "Advance"
        },
        {
            icon: "",
            name: "Starter",
            cost: 500,
            cycle: "Billed Monthly",
            validity: 30,
            keyServices: "Upto 3",
            membership: "Upto 3",
            customBranding: false,
            trainerProfile: "Upto 6",
            contactOptions: "Advance"
        }
    ]

    return (
        <div className={styles.container}>
            <div className={styles.containerWrapper}>
                <HeaderManagerModule moduleName='My Plan'/>
                <Heading title='Build Your Webpage' description='Choose your Web Presence Plan'/>
                <br/>
                <div className={styles.widgetContainer}>
                    { planInfo.map((plan, idx) => (
                        <div className={styles.widget} key={idx}>
                            <span className={styles.widgetTitle}>{plan.name}</span>

                            <br />
                            <span className={styles.widgetPriceWrapper}>
                                <span className={`${styles.widgetPrice}`}>{(plan.cost==0)?"FREE":( <span><span className={styles.inr}>₹</span> {plan.cost}</span> )}</span>
                                <span className={styles.widgetDuration}>{(plan.cost==0)?"For 1":"Per"} Month</span>
                            </span>
                            <hr />

                            <span className={styles.widgetCycle}>{plan.cycle}</span>
                        </div>
                    )) }
                </div>
                <br />
                <br />
                <ProgressBar currentStep={1}/>            
            </div>

        </div>
    )

}