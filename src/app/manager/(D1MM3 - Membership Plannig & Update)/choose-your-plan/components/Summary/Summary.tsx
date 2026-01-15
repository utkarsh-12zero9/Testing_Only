import React, { useEffect, useState } from "react";
import styles from "./Summary.module.css";
import { getPackageDetails } from "../../services/planService";

interface Tax {
  name: string;
  rate: number;
  amount: number;
}

interface AdditionalCharge {
  name: string;
  rate: number;
  amount: number;
}

interface Pricing {
  basePrice: number;
  taxes: Tax[];
  discount?: number | null;
  additionalCharges: AdditionalCharge[];
  subTotal: number;
  invoiceAmount: number;
  currency: string;
}

interface Plan {
  packageID: string;
  pkgName: string;
  validity: number;
  pricing: Pricing;
}

interface OrderSummaryProps {
  selectedPlanID: string;
  onClose: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedPlanID,
  onClose,
}) => {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getPackageDetails();
        console.log("Summary: getPackageDetails response: ", data);
        const selectedPlan = data.data.find(
          (p: Plan) => p.packageID === selectedPlanID
        );
        setPlan(selectedPlan || null);
      } catch (err) {
        console.error("Failed to fetch plan:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [selectedPlanID]);

  if (loading) return <div className={styles.overlay}>Loading...</div>;
  if (!plan) return <div className={styles.overlay}>Plan not found</div>;

  const { pkgName, validity, pricing } = plan;

  return (
    <div className={styles.overlay}>
      <div className={styles.bottomModal}>
        <div className={styles.header}>
          <h2>Order Summary</h2>
        </div>

        <p className={styles.description}>
          Unlock new plan slot to offer wide range of plans to your customers to
          scale your business.
        </p>

        <div className={styles.row}>
          <span className={styles.label}>Selected Plan</span>
          <span className={styles.value}>{pkgName}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Valid For</span>
          <span className={styles.value}>{validity} Days</span>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.applyCoupon}>Apply Coupon!</div>

        <div className={styles.row}>
          <span className={styles.subTitle}>Sub-Total</span>
          <span className={styles.value}>INR {pricing.subTotal}/-</span>
        </div>

        <div className={styles.smallRow}>
          <span>Base Price</span>
          <span>INR {pricing.basePrice}/-</span>
        </div>

        <div className={styles.smallRow}>
          <span>+ Taxes</span>
          <span>
            INR {pricing.taxes.reduce((acc, t) => acc + t.amount, 0).toFixed(2)}
            /-
          </span>
        </div>

        <div className={styles.smallRow}>
          <span>+ Additional Charges</span>
          <span>
            INR{" "}
            {pricing.additionalCharges
              .reduce((acc, c) => acc + c.amount, 0)
              .toFixed(2)}
            /-
          </span>
        </div>

        {pricing.discount ? (
          <div className={styles.smallRow}>
            <span>Discount</span>
            <span>- INR {pricing.discount}/-</span>
          </div>
        ) : null}

        <div className={styles.addGST}>+ Add GST</div>

        <div className={styles.divider}></div>

        <div className={styles.totalRow}>
          <span>Total to Pay</span>
          <span className={styles.totalAmount}>
            INR {pricing.invoiceAmount}/-
          </span>
        </div>

        <div className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            id="terms"
          />
          <label htmlFor="terms">
            <span className={styles.termsText}>
              I accept the terms and conditions and acknowledge that I have read
              and agree to abide by the company's policies and guidelines.
            </span>
          </label>
        </div>

        <div className={styles.btnRow}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>

          <button className={styles.payBtn} disabled={!termsAccepted}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
