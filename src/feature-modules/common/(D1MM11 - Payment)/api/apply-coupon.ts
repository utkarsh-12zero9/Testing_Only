export default async function applyCoupon(paymentID: string, couponCode: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/payment/${paymentID}/apply-coupon/${couponCode}`,
    {
      method: "PATCH",
    }
  );
  
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
};
