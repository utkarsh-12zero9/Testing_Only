import loadScript from "./load-script";

export default async function displayRazorpay(orderData: any) {
  const res = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
  );

  const orderAmount = orderData.amount * 100;

  return new Promise((resolve, reject) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: orderData?.orderID,
      amount: orderAmount,
      currency: "INR",
      name: "Membes Shop",
      description: `Payment for KYC`,
      handler: (pay: any) => resolve(pay),
      prefill: {
        name: orderData.businessName || "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      modal: {
        ondismiss: () => reject('dismissed')
      }
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  });
};
