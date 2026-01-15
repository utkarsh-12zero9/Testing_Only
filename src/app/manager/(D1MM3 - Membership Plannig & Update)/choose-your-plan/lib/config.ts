export const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:6500";

console.log(BASE_URL);

export function apiPath(path: string) {
  return `${BASE_URL}${path}`;
}
