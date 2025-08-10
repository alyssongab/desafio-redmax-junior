import axios from "axios";

const baseURL = typeof window === 'undefined'
  ? process.env.API_URL_INTERNAL
  : process.env.NEXT_PUBLIC_API_URL_EXTERNAL;

export const api = axios.create({
    baseURL: baseURL
});