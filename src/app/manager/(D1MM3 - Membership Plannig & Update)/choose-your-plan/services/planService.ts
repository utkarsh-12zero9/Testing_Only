import { apiPath } from "@/app/manager/(D1MM3 - Membership Plannig & Update)/choose-your-plan/lib/config";

async function handleJSON(res: Response) {
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw { status: res.status, data };
  return data;
}

export async function getPackageDetails() {
  console.log("Fetching: /manager/plan/getPackageDetails");
  const res = await fetch(apiPath("/manager/plan/getPackageDetails"), {
    credentials: "include",
  });
  const data = await handleJSON(res);
  console.log("Fetched package details:", data);
  return data;
}

export async function getMembershipPlans(businessID: string) {
  console.log("Fetching membership plans for businessID:", businessID);
  const res = await fetch(
    apiPath(`/manager/plan/getMembershipPlan?businessID=${businessID}`),
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await handleJSON(res);
  console.log("getMembershipPlans API Response Payload (raw):", data);
  return data;
}

export async function createOrder(payload: {
  businessID: string;
  packageID: string;
  paymentMethod: string;
  productID: string;
}) {
  console.log("Creating order with payload:", payload);
  const res = await fetch(apiPath("/manager/payment/createOrder"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  const data = await handleJSON(res);
  console.log("Created order response:", data);
  return data;
}
