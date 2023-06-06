import { createContext } from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  recoverUserInformation,
  signInRequestAdmin,
  signInRequestPatient,
  signInRequestDoctor,
} from "../app/services/auth";
import { parseCookies, setCookie } from "nookies";
import { api } from "../app/services/api";
import cookie from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import Login from "@/pages/Login";

type AdminProps = {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
  tel: string;
  role: number;
  password: string;
};

type PatientProps = {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  tel: string;
  role: number;
  password: string;
};

type DoctorProps = {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  tel: string;
  role: number;
  password: string;
};

interface SignInData {
  email: string;
  password: string;
  nome: string;
  patient_radio: string | null;
  admin_radio: string | null;
  doctor_radio: string | null;
}

type AuthContextType = {
  isAuthenticated: boolean;
  admin: AdminProps;
  patient: PatientProps;
  doctor: DoctorProps;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminProps | any>(null);
  const [patient, setPatient] = useState<PatientProps | any>(null);
  const [doctor, setDoctor] = useState<DoctorProps | any>(null);
  const [logged, setLogged] = useState(false);
  const isAuthenticated = !!admin || !!patient || !!doctor;

  let storage: any;

  if (typeof window !== "undefined") {
    storage = localStorage.getItem("@francamedical");
  }

  useEffect(() => {
    const token = localStorage.getItem("@francamedical");
    if (token) {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      setAdmin(JSON.parse(token).admin);
      setPatient(JSON.parse(token).paciente);
      setDoctor(JSON.parse(token).medico);
      return;
    }
  }, []);
  console.log("Autenticado: ", isAuthenticated);
  async function signIn({
    email,
    password,
    nome,
    patient_radio,
    doctor_radio,
    admin_radio,
  }: SignInData) {
    if (admin_radio !== null) {
      console.log("entrei no admin");
      await signInRequestAdmin({
        email,
        password,
      })
        .then((token) => {
          console.log("Token: ", token);

          localStorage.setItem("@francamedical", JSON.stringify(token));

          api.defaults.headers["Authorization"] = `Bearer ${token}`;

          setAdmin(token.admin);
          router.push("/QueryList");
        })
        .catch((error) => {
          toast.error(error.response, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }

    if (patient_radio !== null) {
      console.log("entrei no paciente");
      await signInRequestPatient({
        nome,
        password,
      })
        .then((token) => {
          console.log("Token: ", token);

          localStorage.setItem("@francamedical", JSON.stringify(token));

          api.defaults.headers["Authorization"] = `Bearer ${token}`;

          setPatient(token.paciente);
          router.push("/QueryList");
        })
        .catch((error) => {
          toast.error(error.response, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }

    if (doctor_radio !== null) {
      await signInRequestDoctor({
        nome,
        password,
      })
        .then((token) => {
          console.log("Token: ", token);

          localStorage.setItem("@francamedical", JSON.stringify(token));

          api.defaults.headers["Authorization"] = `Bearer ${token}`;

          setDoctor(token.medico);
          router.push("/QueryList");
        })
        .catch((error) => {
          toast.error(error.response, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  }

  async function signOut() {
    localStorage.clear();
    setAdmin(null);
    setPatient(null);
    setDoctor(null);
    cookie.remove("francamedical", { path: "/" });
    router.push("/");
  }

  return (
    <>
      <AuthContext.Provider
        value={{ admin, patient, doctor, isAuthenticated, signIn, signOut }}
      >
        {isAuthenticated ? (
          children
        ) : (
          <>
            <Login />
            <ToastContainer />
          </>
        )}
      </AuthContext.Provider>
    </>
  );
}
