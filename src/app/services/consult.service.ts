import { Consult } from "../models/Consult";
import { api } from "./api";
import { AxiosResponse } from "axios";

const resourceURL: string = "/consulta";

export const useConsultService = () => {
  const POST = async (consult: Consult): Promise<Consult> => {
    const response: AxiosResponse<Consult> = await api.post<Consult>(
      resourceURL,
      consult
    );
    return response.data;
  };

  const GETALL = async (): Promise<Consult[]> => {
    const url: string = `${resourceURL}`;
    const response: AxiosResponse<Consult[]> = await api.get(url);
    return response.data;
  };

  const PUT = async (consult: Consult): Promise<void> => {
    const url: string = `${resourceURL}/${consult.id}`;
    await api.put<Consult>(url, consult);
  };

  const DELETE = async (id: string): Promise<void> => {
    const url: string = `${resourceURL}/${id}`;
    await api.delete(url);
  };

  return {
    POST,
    GETALL,
    PUT,
    DELETE,
  };
};
