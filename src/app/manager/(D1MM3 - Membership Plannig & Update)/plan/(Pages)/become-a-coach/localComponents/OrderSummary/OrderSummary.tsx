'use client';
import React, { useState, useMemo, useCallback } from 'react';
import styles from './OrderSummary.module.css';
import { ShoppingBag, Users, Clock, ChevronDown } from 'lucide-react';

interface OrderSummaryProps {
    isOpen: boolean;
    onClose: () => void;
    onPayNow: () => void;
    productName?: string;
    productDescription?: string;
    validityPeriod?: string;
    pricePerUnit?: number;
    currency?: string;
    defaultDiscount?: number;
    gstRate?: number;
    minQuantity?: number;
    maxQuantity?: number;
    showCouponSection?: boolean;
    showGSTOption?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
    isOpen,
    onClose,
    onPayNow,
    productName = "Plan /Product Name",
    productDescription = "Unlock new plan slot to offer wide range of plans to your customer to scale your business",
    validityPeriod = "Forever",
    pricePerUnit = 500,
    currency = "INR",
    defaultDiscount = 500,
    gstRate = 0.18,
    minQuantity = 1,
    maxQuantity = 99,
    showCouponSection = true,
    showGSTOption = true,
}) => {
    const [quantity, setQuantity] = useState(minQuantity);
    const [isCouponExpanded, setIsCouponExpanded] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [addGST, setAddGST] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(defaultDiscount);

    // Memoize calculated values to prevent unnecessary recalculations
    const subtotal = useMemo(() => pricePerUnit * quantity, [pricePerUnit, quantity]);
    const totalDiscount = useMemo(() => appliedDiscount, [appliedDiscount]);
    const gstAmount = useMemo(() =>
        addGST ? (subtotal - totalDiscount) * gstRate : 0,
        [addGST, subtotal, totalDiscount, gstRate]
    );
    const totalToPay = useMemo(() =>
        subtotal - totalDiscount + gstAmount,
        [subtotal, totalDiscount, gstAmount]
    );

    // Consolidated change handler
    const handleChange = useCallback((field: string, value: string | boolean | null) => {
        switch (field) {
            case 'increment':
                if (quantity < maxQuantity) {
                    setQuantity(prev => prev + 1);
                }
                break;
            case 'decrement':
                if (quantity > minQuantity) {
                    setQuantity(prev => prev - 1);
                }
                break;
            case 'couponCode':
                setCouponCode(value);
                break;
            case 'termsAccepted':
                setIsTermsAccepted(value);
                break;
            case 'addGST':
                setAddGST(!addGST);
                break;
            case 'couponExpanded':
                setIsCouponExpanded(!isCouponExpanded);
                break;
            case 'applyCoupon':
                console.log('Applying coupon:', couponCode);
                //! Example: setAppliedDiscount(newDiscountValue);
                break;
            case 'payNow':
                if (isTermsAccepted) {
                    const orderDetails = {
                        productName,
                        quantity,
                        pricePerUnit,
                        subtotal,
                        discount: totalDiscount,
                        gst: gstAmount,
                        total: totalToPay,
                        couponCode: couponCode || null,
                    };
                    console.log('Order details:', orderDetails);
                    onPayNow();
                }
                break;
        }
    }, [quantity, maxQuantity, minQuantity, addGST, isCouponExpanded, couponCode, isTermsAccepted, productName, pricePerUnit, subtotal, totalDiscount, gstAmount, totalToPay, onPayNow]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <ShoppingBag className={styles.headerIcon} size={20} />
                    <h2 className={styles.title}>Order Summary</h2>
                </div>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Description</h3>
                        <p className={styles.description}>
                            {productDescription}
                        </p>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.infoRow}>
                        <div className={styles.infoLabel}>
                            <Users size={16} />
                            <span>Selected Plan</span>
                        </div>
                        <span className={styles.infoValue}>{productName}</span>
                    </div>

                    <div className={styles.infoRow}>
                        <div className={styles.infoLabel}>
                            <Users size={16} />
                            <span>Quantity</span>
                        </div>
                        <div className={styles.quantityControl}>
                            <button
                                className={styles.quantityButton}
                                onClick={() => handleChange('decrement', null)}
                                disabled={quantity <= minQuantity}
                            >
                                −
                            </button>
                            <span className={styles.quantityValue}>{quantity}</span>
                            <button
                                className={styles.quantityButton}
                                onClick={() => handleChange('increment', null)}
                                disabled={quantity >= maxQuantity}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className={styles.infoRow}>
                        <div className={styles.infoLabel}>
                            <Clock size={16} />
                            <span>Valid For</span>
                        </div>
                        <span className={styles.infoValue}>{validityPeriod}</span>
                    </div>

                    <div className={styles.divider}></div>

                    {showCouponSection && (
                        <div className={styles.couponSection}>
                            <button
                                className={styles.couponButton}
                                onClick={() => handleChange('couponExpanded', null)}
                            >
                                <span>Apply Coupon!</span>
                                <ChevronDown
                                    size={16}
                                    className={`${styles.chevron} ${isCouponExpanded ? styles.chevronRotated : ''}`}
                                />
                            </button>
                            {isCouponExpanded && (
                                <div className={styles.couponInput}>
                                    <input
                                        type="text"
                                        placeholder="Enter coupon code"
                                        className={styles.input}
                                        value={couponCode}
                                        onChange={(e) => handleChange('couponCode', e.target.value)}
                                    />
                                    <button
                                        className={styles.applyButton}
                                        onClick={() => handleChange('applyCoupon', null)}
                                    >
                                        Apply
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <div className={styles.priceRow}>
                        <div className={styles.priceLabel}>
                            <ChevronDown size={16} />
                            <span>Sub-Total</span>
                        </div>
                        <span className={styles.priceValue}>{currency} {subtotal}/-</span>
                    </div>

                    <div className={styles.priceRow}>
                        <span className={styles.discountLabel}>Discount</span>
                        <span className={styles.discountValue}>- {currency} {totalDiscount}/-</span>
                    </div>

                    {showGSTOption && (
                        <button
                            className={styles.gstButton}
                            onClick={() => handleChange('addGST', null)}
                        >
                            <span>+ Add GST</span>
                            {addGST && <span className={styles.gstAmount}>{currency} {gstAmount.toFixed(2)}/-</span>}
                        </button>
                    )}

                    <div className={styles.divider}></div>

                    <div className={styles.totalRow}>
                        <span className={styles.totalLabel}>Total to Pay</span>
                        <span className={styles.totalValue}>{currency} {totalToPay}/-</span>
                    </div>

                    <div className={styles.termsContainer}>
                        <label className={styles.termsLabel}>
                            <input
                                type="checkbox"
                                checked={isTermsAccepted}
                                onChange={(e) => handleChange('termsAccepted', e.target.checked)}
                                className={styles.checkbox}
                            />
                            <span className={styles.termsText}>
                                I accept the terms and conditions and acknowledge that I have read and agree to abide by the company's policies and guidelines.
                            </span>
                        </label>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button className={styles.editButton} onClick={onClose}>
                            Edit
                        </button>
                        <button
                            className={styles.payButton}
                            onClick={() => handleChange('payNow', null)}
                            disabled={!isTermsAccepted}
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(OrderSummary);
