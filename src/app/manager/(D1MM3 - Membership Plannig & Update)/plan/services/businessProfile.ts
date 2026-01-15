import { apiPath } from "../lib/config";

async function handleJSON(res: Response) {
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};
    if (!res.ok) throw { status: res.status, data };
    return data;
}

export async function getBusinessProfile(businessID: string) {
    const res = await fetch(apiPath(`/manager/getBusinessProfile/${businessID}`), {
        method: 'GET',
    });
    return handleJSON(res);
}

export async function getPackageDetails(packageID: string) {
    const res = await fetch(apiPath(`/manager/plan/getPackageDetails?packageID=${packageID}`), {
        method: 'GET',
    });
    return handleJSON(res);
}