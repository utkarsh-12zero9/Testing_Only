import { apiPath } from "../lib/config";

async function handleJSON(res: Response) {
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};
    if (!res.ok) throw { status: res.status, data };
    return data;
}

export async function createMembershipPlan(businessID: string, payload: any) {
    const res = await fetch(apiPath(`/manager/plan/createMembershipPlan/${businessID}`), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    return handleJSON(res);
}

export async function getMembershipPlans(businessID: string) {
    const res = await fetch(apiPath(`/manager/plan/getMembershipPlan?businessID=${businessID}`), {
        method: 'GET',
    });
    const data = await handleJSON(res);
    return data;
}

/* 
    ! For QuickInfo Tab:
    * Change it according to your need
*/
export async function getMemberStatistics(businessID: string) {
    const res = await fetch(apiPath(`/manager/statistics/dashboard?businessID=${businessID}`), {
        method: 'GET',
    });
    return handleJSON(res);
}

export async function getVerificationPlans() {
    const res = await fetch(apiPath('/manager/plan/verificationPlans'), {
        method: 'GET',
    });
    return handleJSON(res);
}

export async function getMembershipPlanById(planID: string) {
    const res = await fetch(apiPath(`/manager/plan/getMembershipPlan?planID=${planID}`), {
        method: 'GET',
    });
    const data = await handleJSON(res); 
    return data;
}

export async function deletePlan(planID: string) {
    const res = await fetch(apiPath(`/manager/plan/deleteMembershipPlan/${planID}`), {
        method: 'DELETE',
    });
    return handleJSON(res);
}

export async function updateMembershipPlan(planID: string, payload: any) {
    const res = await fetch(apiPath(`/manager/plan/updateMembershipPlan/${planID}`), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    return handleJSON(res);
}