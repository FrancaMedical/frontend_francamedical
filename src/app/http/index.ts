import Axios, { AxiosInstance } from "axios";

export const httpClient: AxiosInstance = Axios.create({
  baseURL: process.env.BASE_URL
});
