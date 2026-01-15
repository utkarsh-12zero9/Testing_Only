export default function sendInvoiceToEmail(paymentID: string) {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/payment/${paymentID}/send-invoice`, { method: "POST" });
};
