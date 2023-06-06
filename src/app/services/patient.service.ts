import { Patient } from "../models/Patient";
import { api } from "./api";
import { AxiosResponse } from "axios";

const resourceURL: string = "/pacientes";

export const usePatientService = () => {
  const POST = async (patient: Patient): Promise<Patient> => {
    const response: AxiosResponse<Patient> = await api.post<Patient>(
      resourceURL,
      patient
    );
    return response.data;
  };

  const GETALL = async (): Promise<Patient[]> => {
    const url: string = `${resourceURL}`;
    const response: AxiosResponse<Patient[]> = await api.get(url);
    return response.data;
  };

  return {
    POST,
    GETALL,
  };
};
