export default async function verifyPayment(paymentData: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/payment/verifyOrder`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    }
  );

  if (!response.ok) {
    // action(false, type)
    throw new Error("Payment verification failed");
  }

  const result = await response.json();
  return result.invoiceUrl;
};
