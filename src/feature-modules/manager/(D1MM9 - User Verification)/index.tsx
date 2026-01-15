'use client';
import styles from './style.module.css'
import CustomAccordion from '@/globalComponents/CustomAccordion/CustomAccordion';
import { FAQ_DATA } from './data/faq-data';
import Verification from './localComponents/verfication/Verification';
import { ActiveModal, ErrorType, PersonalVerificationStatus, VerificationDetails, VerificationTypes } from './types';
import { useEffect, useRef, useState } from 'react';
import ProcessingFee from './localComponents/ProcessingFee/ProcessingFee';
import createKycRequest from './api/create-kyc-request';
import { useManagerDispatch, useManagerSelector } from '@/app/manager/Redux/hooks';
import { selectManager, updateManager } from '@/app/manager/Redux/slice/manager-slice';
import KycStatus from './localComponents/KycStatus/KycStatus';
import Modals from './localComponents/Modals/Modals';
import LoadingPage from '@/globalComponents/LoadingPage/LoadingPage';
import getPaymentDetails from './api/get-payment-details';
import { updateBusiness } from '@/app/manager/Redux/slice/business-slice';
import { Payment } from '@/feature-modules/common/(D1MM11 - Payment)/types';

export default function Page({ onClose }: { onClose: () => void }) {
    const managerData = useManagerSelector(selectManager);
    const dispatch = useManagerDispatch();

    const [verificationDetails, setVerificationDetails] = useState<VerificationDetails>({
        verifyType: null,
        kyc_verification_url: "",
        kycVerificationFailed: false,
    });
    const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);
    const [payment, setPayment] = useState<Payment | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorType | null>(null);

    const personalVerificationStatus: PersonalVerificationStatus =
        Number(managerData?.accCreated) >= 3 ? "Verified"
            : verificationDetails?.kycVerificationFailed ? "Failed"
                : verificationDetails?.kyc_verification_url ? "In Progress"
                    : "Pending";

    // get the verificationDetails from localStorage
    useEffect(() => {
        const verificationDetails = JSON.parse(localStorage.getItem('verificationDetails') || "{}");
        setVerificationDetails(verificationDetails);
    }, []);

    // get Payment
    useEffect(() => {
        async function loadData() {
            if (!managerData?.ID) return;
            try {
                setLoading(true);
                const [error, response] = await getPaymentDetails(managerData?.ID);
                if (!error) {
                    setPayment(response);
                }
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        loadData();
    }, [managerData?.ID]);

    async function initiatePersonalVerification(type: VerificationTypes = verificationDetails.verifyType) {
        if (payment?.status !== "Success") {
            setVerificationDetails({ ...verificationDetails, verifyType: type });
            return setActiveModal("processing-fee");
        }

        let kycUrl = verificationDetails?.kyc_verification_url;
        // if the kyc request is not initiated
        if (!kycUrl || verificationDetails?.verifyType !== type) {

            setLoading(true);
            const [error, newVerificationData] = await createKycRequest(managerData, type);
            if (error) {
                setError(error);
                setLoading(false);
                return error.type === 'info' ? setActiveModal("info") : setActiveModal("error");
            }
            kycUrl = newVerificationData.kyc_verification_url;
            setVerificationDetails(newVerificationData);
            setLoading(false);
        }
        setActiveModal('kyc-status');
        setTimeout(() => {
            window.open(kycUrl, '_blank', 'noopener,noreferrer');
        }, 1000);
    }

    function handleCheckStatus(error: any, status: string) {
        if (error) {
            setError(error);
            return error.type === 'info' ? setActiveModal("info") : setActiveModal("error");
        }
        if (status === 'failed') {
            setVerificationDetails({
                kycVerificationFailed: true,
                verifyType: null,
                kyc_verification_url: '',
                access_token: {
                    created_at: '',
                    entity_id: "",
                    id: "",
                    valid_till: ""
                }
            });

            return;
        } else if (status === 'verified') {
            setActiveModal('kyc-status');
            dispatch(updateManager({ accCreated: 3 }));
            dispatch(updateBusiness({ KYCVerified: true }));
        } else {
            setActiveModal('kyc-status');
            window.open(verificationDetails?.kyc_verification_url, '_blank', 'noopener,noreferrer');
        }
    }
    function handleError(error: ErrorType) {
        setActiveModal("error");
        setError(error);
    }
    return (
        <>
            {
                loading &&
                <LoadingPage />
            }
            {
                activeModal === 'processing-fee' &&
                <ProcessingFee
                    type={verificationDetails?.verifyType}
                    payment={payment}
                    setPayment={setPayment}
                    onPay={initiatePersonalVerification}
                    onCancel={() => setActiveModal(null)}
                    onError={handleError}
                />
            }
            {
                activeModal && activeModal !== 'processing-fee' &&
                <Modals
                    activeModal={activeModal}
                    setActiveModal={setActiveModal}
                    personalVerificationStatus={personalVerificationStatus}
                    verificationDetails={verificationDetails}
                    error={error}
                />
            }

            <div style={activeModal ? { display: 'none' } : {}} className={styles.container} onClick={onClose}>
                <div className={`${styles.modal} slideUpAnimation`} onClick={(e) => e.stopPropagation()}>
                    <Verification onVerification={initiatePersonalVerification} personalVerificationStatus={personalVerificationStatus} >
                        {
                            personalVerificationStatus === "In Progress" &&
                            <KycStatus entityId={verificationDetails?.access_token?.entity_id as string} onStatusCheck={handleCheckStatus} />
                        }
                    </Verification>
                    <div className={styles.FAQ}>
                        <h1>FAQs</h1>
                        <CustomAccordion items={FAQ_DATA} />
                    </div>
                </div>
            </div>
        </>
    )
}