import axios from "axios";

// URL
const URL = process.env.REACT_APP_API_URL;

// 기본 axios 설정
export const instance = axios.create({ baseURL: URL, timeout: 2000 });
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.withCredentials = true;

export * from "./broadcasts";
export * from "./stores";
