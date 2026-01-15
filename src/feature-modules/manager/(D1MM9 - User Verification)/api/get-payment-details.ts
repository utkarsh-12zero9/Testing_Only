export default async function getPaymentDetails(managerID: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/kyc/payment/${managerID}`
  );
  const result = await response.json();

  if (response.ok) {
    return [null, result?.data];
  } else {
    return [result, null];
  }
};
