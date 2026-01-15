/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import styles from './page.module.css'
import PaymentPopUp from "@/globalComponents/paymentPopUp/PaymentPopUp";
import { SetStateAction, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LoadingPage from "@/globalComponents/LoadingPage/LoadingPage";
import PaymentModal from "@/globalComponents/paymentModal/PaymentModal";
// import PaymentPopUp from "./localComponents/paymentPopUp/PaymentPopUp";
import { ParamValue } from "next/dist/server/request/params";
import HeaderManagerModule from "@/globalComponents/HeaderManager/ModuleHeader/ModuleHeader";
import Heading from "@/globalComponents/Heading/Heading";

type itemProps = {
  ID: string;
  name: string;
  durationDetails: {
    validity: string;
  };
  totalPrice: {
    basePrice: number,
    additionalCharges: {
      name: string,
      rate: number,
      amount: number
    }[],
    taxes: {
      name: string,
      rate: number,
      amount: number
    }[],
    subTotal:number,
    discount:number|null
  };
}

export default function Page() {

    const [planData, setPlanData] = useState<itemProps | null>(null);
    const [isModalActive, setIsModalActive] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const packageID = useParams().id;
    useEffect(()=>{
       const fetchPlan = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/plan/getPackageDetails`);
            if(!response.ok){
                throw new Error("Could not fetch the plan");
            }
            const result = await response.json();
            const pkg = result.data
            const selectedPackage = pkg.find((pkg: { packageID: ParamValue }) => pkg.packageID === packageID); 
            const packageData = {
                ID: selectedPackage.packageID,
                name:selectedPackage.pkgName,
                durationDetails:{
                    validity: selectedPackage.validity
                },
                totalPrice:selectedPackage.pricing
            }
            setPlanData(packageData);
            console.log(packageData)
       }catch(error : any){
           console.error(error)
       }
       }

       fetchPlan();
    },[packageID])

    useEffect(()=>{
        const userID = localStorage.getItem('userID');
       

        if(userID === null){
            router.push('/manager/');
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
            <div className={styles.main} style={{
                backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, var(--dark-primary-blue) 100%), url("/paymentPageImages/main.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div>
                    <HeaderManagerModule moduleName="Buy Package"/>
                    <Heading title="Buy Package" description=""/>
                    { planData && typeof packageID === "string" && <PaymentPopUp planData={planData} packageID={packageID} action={handleResponse}/>}
                </div>
            </div>
            {isModalActive && (
                <PaymentModal setIsModalActive={setIsModalActive} success={success?0:2} path={"/manager/"} title={success?"Payment Successful!":"Payment Failed!"} message={success?"Congratulations! Membership Slot is Unlocked":"Please reach out to your banking partner."}/>
            )}
        </div>
    );
}