import axios from "axios";

// User에 대한 요청을 보낼 서버 URL
const URL = process.env.REACT_APP_API_URL;

// 기본 axios 설정
const userInstance = axios.create({ baseURL: `${URL}/user`, timeout: 2000 });
userInstance.defaults.headers.post["Content-Type"] = "application/json";
userInstance.defaults.headers.put["Content-Type"] = "application/json";
userInstance.defaults.withCredentials = true;

// 기본 axios 설정
const ownerInstance = axios.create({ baseURL: `${URL}/owner`, timeout: 2000 });
ownerInstance.defaults.headers.post["Content-Type"] = "application/json";
ownerInstance.defaults.headers.put["Content-Type"] = "application/json";
ownerInstance.defaults.withCredentials = true;

export { userInstance, ownerInstance };

export * from "./user";
export * from "./cafeDetail";
export * from "./store";
export * from "./broadcast";
export * from "./home";
export * from "./storeReservation";
export * from "./animalDetail";
