/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import NavBar from "@/globalComponents/navBar/NavBar";
import Modal from "@/globalComponents/modal/Modal";
import styles from './page.module.css'
import KeyFeatures from "./localComponents/keyFeatures/KeyFeatures";
import PaymentPopUp from "./localComponents/paymentPopUp/PaymentPopUp";
import { SetStateAction, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LoadingPage from "@/globalComponents/LoadingPage/LoadingPage";
import PaymentModal from "./localComponents/paymentModal/PaymentModal";

type itemProps = {
    ID: string,
    name: string,
    businessID: string,
    QR: {},
    objective: string[],
    membershipType: string,
    keyFeatures: string[],
    durationDetails: any,
    enableOnlinePayment: boolean,
    totalPrice: number
}

export default function Page() {

    const [planData, setPlanData] = useState<itemProps>();
    const [isModalActive, setIsModalActive] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const planID = useParams().id;
    useEffect(()=>{
       const fetchPlan = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/plan/getMembershipPlan?planID=${planID}`);
            if(!response.ok){
                throw new Error("Could not fetch the plan");
            }
            const result = await response.json();
            setPlanData(result.data.membershipPlans[0]);
            
       }catch(error : any){
           console.error(error)
       }
       }

       fetchPlan();
    },[planID])

    useEffect(()=>{
        const userID = localStorage.getItem('userID');
       

        if(userID === null){
            router.push('/business');
        }
    },[router])

    if(planData === undefined){
        return (
            <LoadingPage/>
        )
    }

    const handleResponse = (response: false) => {
        setIsModalActive(true)
        setSuccess(response)
    }

    return (
        <div className={styles.page}> 
            <NavBar/>
            <div className={styles.fakeNavBar}></div>
        
            <div className={styles.main} style={{
                background: "url('/paymentPageImages/main.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className={styles.overlay}>
                    <div className={styles.left}> 
                        <div className={styles.leftText}>
                            <div className={styles.leftTextTitle}>
                                <h1>Why you should Buy This Plan?</h1>
                                <p>Here&apos;s why we think that our pro plan will be the best for you!</p>
                            </div>
                            {/* key card */}
                            <div className={styles.keyCardList}>
                                {
                                    planData && planData.keyFeatures.map((feature: string, index: number) => {
                                        return (
                                            <KeyFeatures key={index} feature={feature}/>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>
                    <hr  className={styles.verticalDivider}/>
                    <div className={styles.right}>
                        <div className={styles.rightText}>
                            { planData && typeof planID === "string" && <PaymentPopUp planData={planData} planID={planID} action={handleResponse}/>}
                        </div>
                    </div>
                </div>
            </div>

            {isModalActive && (
                <PaymentModal setIsModalActive={setIsModalActive} success={success} businessID={planData.businessID}/>
            )}
        </div>
    );
}