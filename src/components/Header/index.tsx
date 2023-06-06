import React, { useContext } from "react";
import Image from "next/image";
import { CgLogOff } from "react-icons/cg";
import { AuthContext } from "@/contexts/AuthContext";

const Header = () => {
  const { signOut, admin, patient, doctor } = useContext(AuthContext);
  return (
    <header className=" bg-blueMain dark:bg-dark w-full fixed top-0 z-20">
      <div className="flex justify-center items-center relative">
        <div className="">
          <Image
            alt=""
            src="img/FrancaMedicalLogo.svg"
            width={250}
            height={250}
          />
        </div>
        <div className="absolute left-4">
          <Image alt="" src="img/VectorProfile.svg" width={60} height={60} />
        </div>
        <div className="absolute left-32 text-white text-3xl font-bold">
          {admin ? (
            <h1>Olá, Administrador {admin.nome}</h1>
          ) : patient ? (
            <h1>Olá, Paciente {patient.nome}</h1>
          ) : doctor ? (
            <h1>Olá, Doutor {doctor.nome}</h1>
          ) : (
            ""
          )}
        </div>
        <div className="absolute right-4  cursor-pointer" onClick={signOut}>
          <div className="flex flex-row items-center">
            <div>
              <h1 className="text-white font-bold text-2xl mr-3">Sair</h1>
            </div>
            <CgLogOff className="text-4xl text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
