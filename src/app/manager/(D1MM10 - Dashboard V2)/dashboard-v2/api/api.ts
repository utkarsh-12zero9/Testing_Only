export async function getDashboardData(businessID: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/dashboard/v2?businessID=${businessID}`);
  const data = await response.json();
  if (response.ok) {
    return [null, data?.data];
  } else {
    return [data, null];
  }
}

export async function getRushHourData(businessID: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/manager/dashboard/v2/rush-hours?businessID=${businessID}`);
  const data = await response.json();
  if (response.ok) {
    return [null, data?.data];
  } else {
    return [data, null];
  }
}