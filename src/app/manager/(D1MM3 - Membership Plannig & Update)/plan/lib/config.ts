export const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:6500";

export function apiPath(path: string) {
    return `${BASE_URL}${path}`;
}