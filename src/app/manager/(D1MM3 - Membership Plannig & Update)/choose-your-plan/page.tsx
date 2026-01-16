"use client";

import BottomNav from "@/globalComponents/BottomNav/BottomNav";
import styles from "./page.module.css";
import { usePathname, useRouter } from "next/navigation";
import PrimaryButton from "@/globalComponents/buttons/primaryButton/PrimaryButton";
import HeaderManagerModule from "@/globalComponents/HeaderManager/ModuleHeader/ModuleHeader";
import TabNav from "@/globalComponents/TabNav/TabNav";
import Heading from "@/globalComponents/Heading/Heading";
import PlanCard from "./components/PlanCard/PlanCard";
import { useState, useEffect } from "react";
import { getPackageDetails, getMembershipPlans, createOrder } from "./services/planService";
import PaymentPopUp from "@/feature-modules/common/(D1MM11 - Payment)/PaymentPopUp";
import OfferingsTable from "./components/Offerings/Offerings";
import EnterprisePopup from "./components/Enterprise/EnterprisePopup";
import LoadingPage from "@/globalComponents/LoadingPage/LoadingPage";
import { Payment, Pricing } from "@/feature-modules/common/(D1MM11 - Payment)/types";

interface PackagePlan {
	packageID: string;
	pkgName: string;
	validity: number;
	pricing: Pricing;
}

export default function ChoosePlan() {
	const router = useRouter();
	const pathname = usePathname();

	const [monthlyPlans, setMonthlyPlans] = useState<PackagePlan[]>([]);
	const [quarterlyPlans, setQuarterlyPlans] = useState<PackagePlan[]>([]);
	const [activeTab, setActiveTab] = useState(0);

	const [selectedPlanID, setSelectedPlanID] = useState<string | null>(null);

	const [showPaymentPopup, setShowPaymentPopup] = useState(false);
	const [paymentData, setPaymentData] = useState<Payment | null>(null);

	const [showEnterprisePopup, setShowEnterprisePopup] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isInitialLoading, setIsInitialLoading] = useState(true);
	const [loadingStates, setLoadingStates] = useState({ membershipPlans: true, packageDetails: true });

	useEffect(() => {
		const businessData = JSON.parse(localStorage.getItem("businessData") || "{}");
		const businessID = businessData?.ID;
		async function checkActivePlans() {
			try {
				if (!businessID) {
					setLoadingStates(prev => ({ ...prev, membershipPlans: false }));
					return;
				}
				console.log("Calling getMembershipPlans with businessID:", businessID);
				const res = await getMembershipPlans(businessID);
				console.log("getMembershipPlans component response:", res);
				const plans = res?.data?.membershipPlans || res?.data || [];
				console.log("Extracted plans for checkActivePlans:", plans);

				if (Array.isArray(plans) && plans.length > 0) {
					router.push("/manager/plan");
				}
			} catch (error) {
				console.error("Error checking active membership plans:", error);
			} finally {
				setLoadingStates(prev => ({ ...prev, membershipPlans: false }));
			}
		}

		checkActivePlans();
	}, []);

	useEffect(() => {
		async function loadPackages() {
			setLoadingStates(prev => ({ ...prev, packageDetails: true }));
			try {
				console.log("Calling getPackageDetails");
				const res = await getPackageDetails();
				console.log("getPackageDetails response:", res);
				const data = res?.data || [];

				const monthly = data.filter((p: any) => p.validity === 30);
				const quarterly = data.filter((p: any) => p.validity === 90);

				setMonthlyPlans(monthly);
				setQuarterlyPlans(quarterly);

				const defaultPlan = (activeTab === 0 ? monthly : quarterly)?.find(
					(p: any) => p.pkgName.toLowerCase() === "business"
				);

				setSelectedPlanID(defaultPlan?.packageID || "enterprise");
			} catch (error) {
				console.error("Error loading packages:", error);
			} finally {
				setLoadingStates(prev => ({ ...prev, packageDetails: false }));
			}
		}

		loadPackages();
	}, [activeTab]);

	useEffect(() => {
		if (!loadingStates.membershipPlans && !loadingStates.packageDetails) {
			setIsInitialLoading(false);
		}
	}, [loadingStates]);

	const visiblePlans = activeTab === 0 ? monthlyPlans : quarterlyPlans;
	const selectedPlan = visiblePlans.find((p) => p.packageID === selectedPlanID);

	const handlePayment = async (plan: PackagePlan) => {
		setIsLoading(true);
		try {
			const businessData = JSON.parse(localStorage.getItem("businessData") || "{}");
			const businessID = businessData?.ID;
			if (!businessID) {
				throw new Error("Business ID not found");
			}

			const payload = {
				businessID,
				packageID: plan.packageID,
				paymentMethod: "UPI Payment",
				productID: "1",
			};
			console.log("Calling createOrder with payload:", payload);
			const res = await createOrder(payload);
			console.log("createOrder response:", res);

			const paymentID = res?.data?.paymentID;
			console.log(paymentID);
			if (paymentID) {
				localStorage.setItem("paymentID", paymentID);
			}

			const payment: Payment = {
				_id: paymentID || "",
				orderID: paymentID || "",
				planSnapshot: {
					pkgName: plan.pkgName,
					price: plan.pricing.invoiceAmount,
				},
				originalAmount: plan.pricing.invoiceAmount,
				amount: plan.pricing.invoiceAmount,
				pricing: plan.pricing,
				status: "Processing",
				invoiceUrl: res?.data?.invoiceUrl || "",
			};

			setPaymentData(payment);
			setShowPaymentPopup(true);
		} catch (error: unknown) {
			console.error("Error creating order:", error);
			const backendError = error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data ? String(error.data.message) : (error && typeof error === 'object' && 'data' in error && error.data ? String(error.data) : "Failed to create order");
			alert(backendError);
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const handleSuccessPayment = () => {
		setShowPaymentPopup(false);
		router.push("/manager/plan");
	};

	const renderAction = () => {
		if (selectedPlanID === "enterprise") {
			return (
				<PrimaryButton
					type="button"
					colorVariant="primary-green"
					onClick={() => setShowEnterprisePopup(true)}
					className={styles.primaryButton}
				>
					Contact Us
				</PrimaryButton>
			);
		}

		if (!selectedPlan) return null;

		const name = selectedPlan.pkgName.toLowerCase();

		if (name === "trial" || name === "individual") {
			return (
				<PrimaryButton
					type="button"
					colorVariant="primary-green"
					onClick={() => {
						router.push("/manager/plan");
					}}
					className={styles.primaryButton}
				>
					Activate Now
				</PrimaryButton>
			);
		}

		return (
			<>
				<div className={styles.inputContainer}>
					<input type="checkbox" className={styles.inputBox} />
					<span className={styles.text}>
						Do you wish to switch to{" "}
						<span className={styles.specialText}>Individual Plan</span> if user
						limit exceeds?
					</span>
				</div>

				<PrimaryButton
					type="button"
					colorVariant="primary-green"
					onClick={() => handlePayment(selectedPlan)}
					className={styles.primaryButton}
				>
					Pay Now
				</PrimaryButton>
			</>
		);
	};

	if (isInitialLoading) {
		return <LoadingPage />;
	}

	return (
		<div className={styles.page}>
			{isLoading && <LoadingPage />}
			<div className={styles.pageBg} />
			<div className={styles.pageContent}>
				<HeaderManagerModule moduleName="My Plan" />
				<Heading title="Build Your Business" description="Choose Your Plan" />

				<div className={styles.main}>
					<div className={styles.tabnav}>
						<TabNav
							tabs={["Monthly", "Quarterly"]}
							activeTab={activeTab}
							onTabChange={setActiveTab}
						/>
					</div>

					<div className={styles.frame}>
						<div className={styles.planRow}>
							{visiblePlans.map((plan) => (
								<div
									key={plan.packageID}
									onClick={() => setSelectedPlanID(plan.packageID)}
									className={
										plan.packageID === selectedPlanID
											? styles.activePlanCard
											: ""
									}
								>
									<PlanCard
										plan={plan}
										icon={`/choosePlan/${plan.pkgName.toLowerCase()}.svg`}
									/>
								</div>
							))}

							{visiblePlans.length > 0 && (
								<div
									onClick={() => setSelectedPlanID("enterprise")}
									className={
										selectedPlanID === "enterprise" ? styles.activePlanCard : ""
									}
								>
									<PlanCard
										plan={{ pkgName: "Enterprise" }}
										icon="/choosePlan/enterprise.svg"
										custom={true}
									/>
								</div>
							)}
						</div>

						<div className={styles.buttonContainer}>{renderAction()}</div>
						<div className={styles.infoContainer}>
							<span className={styles.info}>
								Billed Monthly, Cancel Anytime
							</span>
						</div>
					</div>
				</div>

				{showPaymentPopup && paymentData && (
					<PaymentPopUp
						payment={paymentData}
						setPayment={setPaymentData}
						description="Complete your payment to activate your selected plan."
						onSuccess={handleSuccessPayment}
						onClose={() => setShowPaymentPopup(false)}
					/>
				)}

				{showEnterprisePopup && (
					<div
						className={styles.modalOverlay}
						onClick={() => setShowEnterprisePopup(false)}
					>
						<div
							className={styles.modalContent}
							onClick={(e) => e.stopPropagation()}
						>
							<EnterprisePopup onClose={() => setShowEnterprisePopup(false)} />
						</div>
					</div>
				)}

				{!showPaymentPopup && !showEnterprisePopup && (
					<OfferingsTable plans={visiblePlans as any[]} selectedPlanID={selectedPlanID!} />
				)}

				{!showPaymentPopup && !showEnterprisePopup && (
					<div className={styles.bottomNavContainer}>
						<BottomNav pathname={pathname} />
					</div>
				)}
			</div>
		</div>
	);
}