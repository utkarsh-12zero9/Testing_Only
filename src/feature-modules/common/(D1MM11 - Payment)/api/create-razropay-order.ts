export default async function createRazorpayOrder(paymentID: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/payment/${paymentID}/createRazorpayOrder`,
    {
      method: "POST"
    }
  );

  if (!response.ok) {
    throw new Error("Payment creation failed");
  }

  const result = await response.json();
  return result.data;
};
