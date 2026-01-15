/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import PrimaryButton from "@/globalComponents/buttons/primaryButton/PrimaryButton";
import styles from "./PaymentPopUp.module.css";
import InputBox from "@/globalComponents/inputs/inputBox/InputBox";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoadingPage from "@/globalComponents/LoadingPage/LoadingPage";
import PaymentModal from "../paymentModal/PaymentModal";

type itemProps = {
  ID: string;
  name: string;
  businessID: string;
  QR: {};
  objective: string[];
  membershipType: string;
  keyFeatures: string[];
  durationDetails: any;
  enableOnlinePayment: boolean;
  totalPrice: number;
};

function PaymentPopUp({
  planData,
  planID,
  action
}: {
  planData: itemProps;
  planID: string;
  action: (result: any) => void;
}) {
  const [isCouponOpen, setIsCouponOpen] = useState<boolean>(false);
  const [isGstOpen, setIsGstOpen] = useState<boolean>(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState<boolean>(false);
  const [businessName, setBusinessName] = useState<string>("");
  const [gstNumber, setGstNumber] = useState<string>("");
  const [coupon, setCoupon] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentId, setPaymentId] = useState("");
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [userID, setUserID] = useState<string>("");
  const [isModalActive, setIsModalActive] = useState(false);

  const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // Calculate price breakdown
  const basePrice = planData.totalPrice;
  const taxes = Math.round(basePrice * 0.18); // 18% GST
  const additionalCharges = Math.round(basePrice * 0.05); // 5% service charge
  const discount = 0;
  const totalPrice = basePrice + taxes + additionalCharges - discount;

  const handlePayment = async () => {
    if (!acceptTerms) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/payment/createOrder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerID: userID,
            planID: planID,
            paymentMethod: "UPI Payment",
            // Added GST Number
            gstNumber: gstNumber
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Could not create the order");
      }

      const result = await response.json();
      console.log("Order created successfully:", result);

      await displayRazorpay(result.data.order);
    } catch (error: any) {
      console.error("Payment error:", error);
      alert("Payment failed: " + error.message);
    }
  };

  const displayRazorpay = async (orderData?: any) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const orderId = orderData?.id || "";
    const orderAmount = 10; // make it dynamic
    console.log(orderAmount)

    const options = {
      key: RAZORPAY_KEY,
      amount: orderAmount,
      currency: "INR",
      name: "Membes Shop",
      description: `Payment for ${planData.name}`,
      order_id: orderId,
      handler: function (response: any) {
        const paymentData = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        setPaymentId(response.razorpay_payment_id);

        verifyPayment(paymentData);
      },
      prefill: {
        name: businessName || "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  const verifyPayment = async (paymentData: any) => {
    console.log(paymentData);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/payment/verifyOrder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      if (!response.ok) {
        action(false)
        throw new Error("Payment verification failed");
      }

      const result = await response.json();
      action(result);
      if (result.invoiceUrl) {
        fetch(result.invoiceUrl).then((response) => {
          response.blob().then((blob) => {
            const fileURL =
              window.URL.createObjectURL(blob);
            let alink = document.createElement("a");
            alink.href = fileURL;
            alink.download = "Invoice.pdf";
            alink.click();
          });
        });
      }
      console.log("Payment verified successfully:", result);
      setIsLoading(false)
    } catch (error: any) {
      console.error("Payment verification error:", error);
    } finally {
      setIsLoading(false)
    }
  };

  const handleCoupon = () => {
    alert("Coupon functionality not implemented yet");
  };

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    if (userID) {
      setUserID(userID);
    }
  }, []);

  return (
    <div className={styles.popUp}>
      {isLoading && (
        <div className="h-100 top-0 absolute bg-(--bodyfill-dark-green-50) w-100">
          <LoadingPage />
        </div>
      )}
      <div className={styles.title}>
        <Image src="/paymentIcons/bag.svg" alt="" height={25} width={25} />
        <h1>Order Summary</h1>
      </div>

      <div className={styles.container}>
        <div className={styles.description}>
          <h4>Description</h4>
          <p>
            Unlock new plan slot to offer wide range of plans to your customer
            to scale your business.{" "}
          </p>
        </div>
        <hr className={styles.divider} />

        <div className={styles.quantityInfo}>
          <div className={styles.selectedPlan}>
            <div className={styles.plan}>
              <div>
                <Image
                  src="/paymentIcons/quantityIcons/candle.svg"
                  alt=""
                  height={12}
                  width={12}
                />
              </div>
              <p>Selected Plan</p>
            </div>
            <p>{planData.name}</p>
          </div>

          <div className={styles.selectedPlan}>
            <div className={styles.plan}>
              <div>
                <Image
                  src="/paymentIcons/quantityIcons/timer.svg"
                  alt=""
                  height={12}
                  width={12}
                />
              </div>
              <p>Valid For</p>
            </div>
            <p>{planData.durationDetails.validity} Days</p>
          </div>

          <div className={styles.selectedPlan}>
            <div className={styles.plan}>
              <div>
                <Image
                  src="/paymentIcons/quantityIcons/hourGlass.svg"
                  alt=""
                  height={12}
                  width={12}
                />
              </div>
              <p>Session Count</p>
            </div>
            <p>{planData.durationDetails.sessionCount} Sessions</p>
          </div>
        </div>
        <hr className={styles.divider} />

        <div className={styles.coupon}>
          <p onClick={() => setIsCouponOpen(!isCouponOpen)}>
            Apply Coupon!{" "}
            {isCouponOpen ? (
              <Image
                src="/paymentIcons/quantityIcons/close.svg"
                alt=""
                width={30}
                height={30}
              />
            ) : (
              <Image
                src="/paymentIcons/quantityIcons/drop-down.svg"
                alt=""
                width={30}
                height={30}
              />
            )}
          </p>
          {isCouponOpen && (
            <div>
              <InputBox
                label=""
                placeholder="Enter Coupon Code"
                name="coupon"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.value);
                }}
              ></InputBox>
              <PrimaryButton onClick={handleCoupon} >Apply</PrimaryButton>
            </div>
          )}
        </div>

        <div className={styles.priceBreakDown}>
          <div className={styles.subTotal} onClick={() => setIsSummaryOpen(!isSummaryOpen)}>
            <div className={styles.subTotalLeft}>
              <p>
                Sub-Total
              </p>
              {isSummaryOpen ? (
                <Image
                  src="/paymentIcons/quantityIcons/close.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              ) : (
                <Image
                  src="/paymentIcons/quantityIcons/drop-down.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              )}
            </div>

            <div className={styles.subTotalRight}>

              <span>INR {totalPrice}/-</span>

            </div>
          </div>

          {isSummaryOpen && (
            <div className={styles.summaryBreakdown}>
              <div className={styles.breakdownItem}>
                <p>Base Price</p>
                <span>INR {basePrice}/-</span>
              </div>
              <div className={styles.breakdownItem}>
                <p>Taxes (18% GST)</p>
                <span>INR {taxes}/-</span>
              </div>
              <div className={styles.breakdownItem}>
                <p>Additional Charges</p>
                <span>INR {additionalCharges}/-</span>
              </div>
            </div>
          )}

          <div className={styles.discount}>
            <p>Discount</p>
            <span>- INR {discount}/-</span>
          </div>
        </div>

        <div className={styles.gst} onClick={() => setIsGstOpen(!isGstOpen)}>
          {isGstOpen ? (
            <p className={styles.openGstText}>- ADD GST</p>
          ) : (
            <p className={styles.closedGstText}>+ ADD GST</p>
          )}
        </div>

        {isGstOpen && (
          <div className={styles.gstInput}>
            <InputBox
              label=""
              placeholder="Enter your Business Name"
              name="businessName"
              value={businessName}
              onChange={(e) => {
                setBusinessName(e.value);
              }}
            ></InputBox>
            <div className={styles.gstInputBox}>
              <InputBox
                label=""
                placeholder="Enter GST Number"
                name="gst"
                value={gstNumber}
                onChange={(e) => {
                  setGstNumber(e.value);
                }}
              ></InputBox>
              {/* Unnecessary Button */}
              {/* <PrimaryButton
                text="Apply"
                type="default"
                action={handleCoupon}
              /> */}
            </div>
          </div>
        )}

        <hr className={styles.divider} />

        <div className={styles.total}>
          <h4>Total to Pay</h4>
          <h3>INR {totalPrice}/-</h3>
        </div>

        <div className={styles.submit}>
          <div className={styles.terms}>
            <input
              type="checkbox"
              checked={acceptTerms}
              className={styles.checkBox}
              onChange={() => setAcceptTerms(!acceptTerms)}
            />
            <p>
              I accept the terms and conditions and acknowledge that I have read
              and agree to abide by the company&apos;s policies and guidelines.
            </p>
          </div>
        </div>

        <div className={styles.buttonsDiv}>
          <PrimaryButton className="w-full" onClick={handlePayment}>
            {isLoading ? "Processing..." : "Pay Now"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default PaymentPopUp;
