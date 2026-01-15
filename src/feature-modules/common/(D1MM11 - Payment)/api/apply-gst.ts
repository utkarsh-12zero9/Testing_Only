export default async function applyGST(paymentID: string, gstNumber: string, businessName: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/payment/${paymentID}/apply-gst`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({gstNumber, businessName}),
    }
  );
  
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
};
