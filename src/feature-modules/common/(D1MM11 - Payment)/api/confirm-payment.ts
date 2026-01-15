export default async function confirmPayment(paymentID: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/payment/${paymentID}/confirmPayment`,
    {
      method: "POST"
    }
  );

  if (!response.ok) {
    throw new Error("Payment confiramtion failed");
  }

  const result = await response.json();
  return result.data;
};
