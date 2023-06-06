import { Doctor } from "../models/Doctor";
import { api } from "./api";
import { AxiosResponse } from "axios";

const resourceURL: string = "/medico";

export const useDoctorService = () => {
  const POST = async (doctor: Doctor): Promise<Doctor> => {
    const response: AxiosResponse<Doctor> = await api.post<Doctor>(
      resourceURL,
      doctor
    );
    return response.data;
  };

  const GETALL = async (): Promise<Doctor[]> => {
    const url: string = `${resourceURL}`;
    const response: AxiosResponse<Doctor[]> = await api.get(url);
    return response.data;
  };

  return {
    POST,
    GETALL,
  };
};
