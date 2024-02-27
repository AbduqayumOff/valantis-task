import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { PASSWORD_API } from "../../constants";
import md5 from "md5";

const baseAPI = process.env.REACT_APP_BASE_API;
const instance = axios.create();

instance.defaults.baseURL = baseAPI;

const password = PASSWORD_API;
const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const authString = `${password}_${currentDate}`;
const authHeader = md5(authString);

const onFulfilledReq = (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers = {
    ...config.headers,
    "X-Auth": authHeader,
  };

  return config;
};

const onRejectedReq = (error: AxiosError) => {
  return Promise.reject(error);
};

const onFulfilledRes = (response: AxiosResponse) => {
  return response;
};

const onRejectedRes = (error: AxiosError) => {
  return Promise.reject(error);
};

instance.interceptors.request.use(onFulfilledReq as any, onRejectedReq);
instance.interceptors.response.use(onFulfilledRes, onRejectedRes);

export default instance;
