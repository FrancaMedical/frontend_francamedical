import { api } from "./api";

type SignInRequestAdminData = {
  email: string;
  password: string;
};

type SignInRequestPatientData = {
  nome: string;
  password: string;
};

type SignInRequestDoctorData = {
  nome: string;
  password: string;
};

export async function signInRequestAdmin({
  email,
  password,
}: SignInRequestAdminData) {
  const response = await api.post(`/auth/login/admin`, {
    email,
    password,
  });

  return response.data;
}

export async function signInRequestPatient({
  nome,
  password,
}: SignInRequestPatientData) {
  const response = await api.post(`/auth/login/pacientes`, {
    nome,
    password,
  });

  return response.data;
}

export async function signInRequestDoctor({
  nome,
  password,
}: SignInRequestDoctorData) {
  const response = await api.post(`/auth/login/medico`, {
    nome,
    password,
  });

  return response.data;
}
export async function recoverUserInformation() {
  const response = await api.post("/auth/me");

  return response.data;
}
