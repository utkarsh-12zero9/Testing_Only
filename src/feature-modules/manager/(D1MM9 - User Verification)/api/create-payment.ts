export default async function createPayment(businessID: string, type: string) {
  const requestBody = {
    businessID: businessID,
    paymentMethod: "UPI Payment",
    verificationType: type
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/payment/verification/createOrder`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    throw new Error("Could not create the order");
  }

  const result = await response.json();
  return result.data;
};
