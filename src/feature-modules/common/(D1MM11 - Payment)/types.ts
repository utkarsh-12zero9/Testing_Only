export type ActiveModal = "failed" | "success" | null;

type AdditionalCharges = {
  name: string,
  rate: number,
  amount: number
}
export interface Pricing {
  desiredNetAmount: number;
  basePrice: number;
  gst?: {
    gstNumber: string;
    businessName: string;
  }
  discount?: {
    codeName: string;
    type: 'flat' | 'percent';
    value: number;
    amount: number;
  };
  taxes: AdditionalCharges[];
  additionalCharges: AdditionalCharges[];
  subTotal: number;
  invoiceAmount: number;
  currency: string;
};

export interface Payment {
  _id: string;
  orderID: string;
  planSnapshot: {
    name?: string;
    pkgName?: string;
    price: number;
    validity?: string;
  }
  originalAmount: number;
  amount: number;
  pricing: Pricing;
  status: "Success" | "Processing";
  invoiceUrl: string;
}

export interface PaymentPopUpProps {
  payment: Payment;
  setPayment: React.Dispatch<React.SetStateAction<Payment | null>>;
  description: string;
  onSuccess: (payment: Payment) => void;
  onClose: () => void;
}

export type FormDataType = {
  businessName: string;
  gstNumber: string;
  coupon: string;
}

export type FormErrors = Partial<Record<keyof FormDataType, string>> & {
  terms?: string;
}