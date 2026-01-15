/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PrimaryButton from "@/globalComponents/buttons/primaryButton/PrimaryButton";
import styles from "./PaymentPopUp.module.css";
import InputBox from "@/globalComponents/inputs/inputBox/InputBox";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LoadingPage from "@/globalComponents/LoadingPage/LoadingPage";
import displayRazorpay from "./utils/displayRazorpay";
import verifyPayment from "./api/verify-payment";
import CheckMark from "@/globalComponents/inputs/CheckMark/CheckMark";
import Modal from "@/globalComponents/modal/Modal";
import { ActiveModal, FormDataType, FormErrors, PaymentPopUpProps } from "./types";
import SuccessfulPopup from "./components/SuccessfulPopup/SuccessfulPopup";
import FailedPopup from "./components/FailedPopup/FailedPopup";
import GSTInputBox from "@/globalComponents/inputs/GSTInputBox/GSTInputBox";
import SecondaryButton from "@/globalComponents/buttons/secondaryButton/SecondaryButton";
import applyGST from "./api/apply-gst";
import applyCoupon from "./api/apply-coupon";
import createRazorpayOrder from "./api/create-razropay-order";
import confirmPayment from "./api/confirm-payment";

function PaymentPopUp({ payment, setPayment, description, onSuccess, onClose }: PaymentPopUpProps) {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [data, setData] = useState<FormDataType>({
    businessName: "",
    gstNumber: "",
    coupon: "",
  });
  const [isTermAccepted, setIsTermAccepted] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({ terms: "" });
  const [apiErrors, setApiErrors] = useState({ gst: "", coupon: "" });
  const [isGstOpen, setIsGstOpen] = useState<boolean>(false);
  const [isCouponOpen, setIsCouponOpen] = useState<boolean>(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setData({
      businessName: payment.pricing?.gst?.businessName || data.businessName,
      gstNumber: payment.pricing?.gst?.gstNumber || data.gstNumber,
      coupon: payment.pricing?.discount?.codeName || data.coupon,
    });
  }, [payment]);

  function handleChange(payload: { name: string; value: any; type?: string; }) {
    const name = payload.name as keyof FormDataType;
    const { value } = payload;
    const errors: FormErrors = {};

    setData((prev) => {
      const newFormData: FormDataType = { ...prev };
      newFormData[name] = value;
      let error = "";

      if (name === "gstNumber" && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(value)) {
        error = "Enter a valid GST Number";
      }

      if (name === 'businessName' && (!value.trim() || value.length < 3 || value.length > 100)) {
        error = "Business Name must be between 3 and 100 characters";
      }

      if (name === "coupon" && (!value || !value.trim())) {
        error = "Enter a coupon code";
      }

      errors[name] = error;
      return newFormData;
    });

    setErrors((prev) => ({
      ...prev,
      ...errors
    }));
  }

  const handlePayment = async () => {
    if (!isTermAccepted) {
      return setErrors({ ...errors, terms: "Please accept the terms and conditions" });
    }

    setIsLoading(true);
    try {
      let successPayment;
      if (payment.amount === 0) {
        successPayment = await confirmPayment(payment._id);
      } else {
        const razorpayOrder = await createRazorpayOrder(payment._id);
        const response: any = await displayRazorpay(razorpayOrder);
        const paymentData = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };
        successPayment = await verifyPayment(paymentData);
      }
      setPayment(payment);
      setActiveModal("success");
    } catch (error: any) {
      console.log("Payment error:", error);
      setActiveModal("failed");
    }
    finally {
      setIsLoading(false);
    }
  };

  async function handleCouponApply() {
    if (data.coupon === payment.pricing?.discount?.codeName) {
      return setApiErrors({ ...apiErrors, coupon: "Same coupon is already applied" });
    }
    setApiErrors({ ...apiErrors, coupon: "" });
    setIsLoading(true);
    try {
      const paymentData = await applyCoupon(payment._id, data.coupon);
      setPayment(paymentData);
    } catch (error: any) {
      setApiErrors({ ...apiErrors, coupon: error.message || "" });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGSTApply() {
    if (data.gstNumber === payment.pricing?.gst?.gstNumber && data.businessName === payment.pricing?.gst?.businessName) {
      return setApiErrors({ ...apiErrors, gst: "Same GST already applied" });
    }
    setApiErrors({ ...apiErrors, gst: "" })
    setIsLoading(true);
    try {
      const paymentData = await applyGST(payment._id, data.gstNumber, data.businessName);
      setPayment(paymentData);
    } catch (error: any) {
      setApiErrors({ ...apiErrors, gst: error.message || "" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <LoadingPage />
      )}
      {
        activeModal === "success" &&
        <SuccessfulPopup paymentID={payment._id} onContinue={() => onSuccess(payment)} />
      }
      {
        activeModal === "failed" &&
        <FailedPopup onClick={onClose} />
      }
      {
        !activeModal &&
        <Modal className={styles.modal} onOutsideClick={onClose}>
          <div className={styles.title}>
            <Image src="/paymentIcons/bag.svg" alt="" height={25} width={25} />
            <h1>Order Summary</h1>
          </div>
          <div className={styles.container}>
            <div className={styles.description}>
              <h4>Description</h4>
              <p>{description}</p>
            </div>
            <hr className={styles.divider} />

            <div className={styles.quantityInfo}>
              <div className={styles.selectedPlan}>
                <div className={styles.plan}>
                  <Image
                    src="/paymentIcons/quantityIcons/candle.svg"
                    alt=""
                    height={12}
                    width={12}
                  />
                  <p>Selected Plan</p>
                </div>
                <p>{payment.planSnapshot?.name || payment.planSnapshot?.pkgName}</p>
              </div>

              <div className={styles.selectedPlan}>
                <div className={styles.plan}>
                  <Image
                    src="/paymentIcons/quantityIcons/timer.svg"
                    alt=""
                    height={12}
                    width={12}
                  />
                  <p>Valid For</p>
                </div>
                <p>{payment.planSnapshot?.validity || "Forever"}</p>
              </div>
            </div>
            <hr className={styles.divider} />


            <div className={styles.coupon}>
              <p className={`${styles.couponHeader} ${isCouponOpen ? styles.active : ""}`}>
                Apply Coupon!{" "}
                <button onClick={() => setIsCouponOpen(!isCouponOpen)}>
                  {isCouponOpen ? (
                    <Image
                      src="/paymentIcons/quantityIcons/close.svg"
                      alt="" width={30} height={30}
                    />
                  ) : (
                    <Image
                      src="/paymentIcons/quantityIcons/drop-down.svg"
                      alt="" width={30} height={30}
                    />
                  )}
                </button>
              </p>
              {isCouponOpen && (
                <>
                  <div>
                    <InputBox
                      label=""
                      placeholder="Enter Coupon Code"
                      name="coupon"
                      value={data.coupon}
                      onChange={handleChange}
                      error={errors.coupon || apiErrors.coupon}
                    ></InputBox>
                    <PrimaryButton onClick={handleCouponApply} disabled={!!errors.coupon || !data.coupon} >Apply</PrimaryButton>
                  </div>
                </>
              )}
            </div>

            <div className={styles.priceBreakDown}>
              {
                payment.pricing?.discount &&
                <>
                  <div className={styles.discount}>
                    <p>Original Price</p>
                    <span>INR {payment.originalAmount}/-</span>
                  </div>
                  <div className={styles.discount}>
                    <p>Discount</p>
                    <span>- INR {payment.pricing?.discount?.amount}/-</span>
                  </div>
                </>
              }
              <div className={styles.subTotal}>
                <div className={styles.subTotalLeft}>
                  <p className={isSummaryOpen ? styles.active : ""}>
                    Sub-Total
                  </p>
                  <button onClick={() => setIsSummaryOpen(!isSummaryOpen)}>
                    {isSummaryOpen ? (
                      <Image
                        src="/paymentIcons/quantityIcons/close.svg"
                        alt=""
                        width={24}
                        height={24}
                      />
                    ) : (
                      <Image
                        src="/paymentIcons/quantityIcons/drop-down.svg"
                        alt=""
                        width={24}
                        height={24}
                      />
                    )}
                  </button>
                </div>

                <div className={styles.subTotalRight}>
                  <span>INR {payment.pricing?.desiredNetAmount}/-</span>
                </div>
              </div>

              {isSummaryOpen && (
                <div className={styles.summaryBreakdown}>
                  <div className={styles.breakdownItem}>
                    <p>Base Price</p>
                    <span>INR {payment.pricing.basePrice}/-</span>
                  </div>
                  {
                    payment.pricing?.taxes?.map(({ name, rate, amount }) => (
                      <div key={name} className={styles.breakdownItem}>
                        <p>{name} ({rate}%)</p>
                        <span>INR {name === 'GST' && payment.pricing.gst ? <del>{amount}</del> : amount}/-</span>
                      </div>
                    ))
                  }
                  <div className={styles.breakdownItem}>
                    <p>Additional Charges</p>
                    <span>INR {payment.pricing.additionalCharges.reduce((acc, curr) => acc + curr.amount, 0)}/-</span>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.gst} onClick={() => setIsGstOpen(!isGstOpen)}>
              <p className={isGstOpen ? styles.openGstText : styles.closedGstText}>
                {
                  isGstOpen ? '- ' : '+ '
                }
                {
                  payment.pricing.gst ? 'ADDED GST' : 'ADD GST'
                }
              </p>
            </div>

            {isGstOpen && (
              <div className={styles.gstInputContainer}>
                <InputBox
                  label="Business Name"
                  placeholder="Enter your Business Name"
                  name="businessName"
                  value={data.businessName}
                  onChange={handleChange}
                  error={errors.businessName}
                ></InputBox>
                <div className={styles.gstInput}>
                  <GSTInputBox
                    label="GST Number"
                    placeholder="Enter GST Number"
                    name="gstNumber"
                    value={data.gstNumber}
                    onChange={handleChange}
                    error={errors.gstNumber}
                  />
                  <PrimaryButton onClick={handleGSTApply} disabled={!!errors.gstNumber || !!errors.businessName}>Apply</PrimaryButton>
                </div>
                {
                  apiErrors.gst &&
                  <p className={styles.errorText}>{apiErrors.gst}</p>
                }
              </div>
            )}

            <hr className={styles.divider} />

            <div className={styles.total}>
              <h4>Total to Pay</h4>
              <h3>INR {payment?.amount}/-</h3>
            </div>

            <div className={styles.submit}>
              <div className={styles.terms}>
                <CheckMark
                  name="tnc2"
                  value={isTermAccepted}
                  error={errors?.terms}
                  onChange={() => setIsTermAccepted(!isTermAccepted)}
                />
                <p className={errors.terms ? styles.error : ""}>
                  I accept the terms and conditions and acknowledge that I have read
                  and agree to abide by the company&apos;s policies and guidelines.
                </p>
              </div>
            </div>

            <div className={styles.buttonsDiv}>
              <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
              <PrimaryButton className="w-full" onClick={handlePayment}>{isLoading ? "Processing..." : "Pay Now"}</PrimaryButton>
            </div>
          </div>
        </Modal>
      }
    </>
  );
}

export default PaymentPopUp;
