import axios from "axios";

function createInstanceWithAuthInterceptor() {
  const instance = createAxiosInstance();
  return instance;
}
export function createAxiosInstance() {
  let instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ORIGIN,
    timeout: 5000,
  });
  return instance;
}

export const httpClient = createInstanceWithAuthInterceptor();
