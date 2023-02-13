import axios from "axios";

// User에 대한 요청을 보낼 서버 URL
const URL = process.env.REACT_APP_API_URL;

// 기본 axios 설정
const instance = axios.create({ baseURL: URL, timeout: 2000 });
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.put["Content-Type"] = "application/json";
instance.defaults.withCredentials = true;

export default instance;

export * from "./user";
export * from "./cafeDetail";
export * from "./store";
export * from "./broadcast";
export * from "./home";
