import { apiPath } from "../lib/config";

async function handleJSON(res: Response) {
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};
    if (!res.ok) throw { status: res.status, data };
    return data;
}

export async function createTrainerProfile(formData: FormData) {
    const res = await fetch(apiPath(`/trainer/create/trainer-profile`), {
        method: 'POST',
        body: formData,
    });
    return handleJSON(res);
}

export async function getTrainerProfileByPlanID(planID: string) {
    const res = await fetch(apiPath(`/trainer/trainer-profile?planID=${planID}`), {
        method: 'GET',
    });
    return handleJSON(res);
}

export async function getTrainerProfileByBusinessID(businessID: string) {
    const res = await fetch(apiPath(`/trainer/trainer-profile?businessID=${businessID}`), {
        method: 'GET',
    });
    return handleJSON(res);
}

export async function getTrainerProfileByTrainerID(trainerID: string) {
    const res = await fetch(apiPath(`/trainer/trainer-profile?trainerID=${trainerID}`), {
        method: 'GET',
    });
    return handleJSON(res);
}

export async function updateTrainerProfileByTrainerID(trainerID: string, formData: FormData) {
    const res = await fetch(apiPath(`/trainer/trainer-profile/${trainerID}`), {
        method: 'PUT',
        body: formData,
    });
    return handleJSON(res);
}

export async function deleteTrainerProfileByTrainerID(trainerID: string) {
    const res = await fetch(apiPath(`/trainer/trainer-profile/${trainerID}`), {
        method: 'DELETE',
    });
    return handleJSON(res);
}