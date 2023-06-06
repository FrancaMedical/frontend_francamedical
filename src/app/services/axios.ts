import axios, { AxiosRequestTransformer } from "axios";
import dayjs from "dayjs";
import moment from "moment-timezone";
var qs = require("qs");

export function getAPIClient(ctx?: any) {
  const dateTransformer = (data: any): any => {
    if (data instanceof Date) {
      return data.toLocaleString();
    }
    if (Array.isArray(data)) {
      return data.map(dateTransformer);
    }
    if (typeof data === "object" && data !== null) {
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          dateTransformer(value),
        ])
      );
    }
    return data;
  };

  let userInfo;

  if (typeof window !== "undefined") {
    userInfo = localStorage.getItem("@francamedical");
  }
  const token = userInfo?.slice(16).slice(0, -2);

  const api = axios.create({
    transformRequest: [
      dateTransformer,
      ...(axios.defaults.transformRequest as AxiosRequestTransformer[]),
    ],
    baseURL: process.env.BASE_URL,
  });

  api.interceptors.request.use((config) => {
    config.paramsSerializer = {
      encode: (params) =>
        qs.stringify(params, {
          serializeDate: (date: Date) =>
            dayjs(date).format("YYYY-MM-DDTHH:mm:ssZ"),
        }),
    };
    return config;
  });

  api.interceptors.request.use((config) => {
    Date.prototype.toJSON = function () {
      return moment(this).format();
    };

    if (localStorage.getItem("@francamedical")) {
      config.headers.Authorization = `Bearer ${localStorage
        .getItem("@francamedical")
        ?.slice(16)
        .slice(0, -2)}`;
    }

    return config;
  });

  return api;
}
