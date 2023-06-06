import Image from "next/image";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type SignInProps = {
  email: string;
  password: string;
  nome: string;
  patient_radio: string | null;
  admin_radio: string | null;
  doctor_radio: string | null;
};

export default function Login() {
  const { register, handleSubmit } = useForm<SignInProps>();
  const { signIn } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState("patient");

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  console.log(selectedOption);
  const handleSignIn: SubmitHandler<SignInProps> = async (
    data: SignInProps
  ) => {
    if (selectedOption == "admin") {
      data.admin_radio = "admin";
    } else if (selectedOption == "patient") {
      data.patient_radio = "patient";
    } else if (selectedOption == "doctor") {
      data.doctor_radio = "doctor";
    }
    await signIn(data);
    console.log("Data: ", data);
  };
  return (
    <main className="h-screen w-full">
      <div className="flex flex-row relative">
        <section className="bg-blueMain w-7/12 h-screen z-0">
          <div className="flex justify-center -ml-36 items-center h-full">
            <Image src="img/Logo.svg" width={500} height={500} alt={""} />
          </div>
        </section>

        <section className="bg-whiteEdited rounded rounded-l-teste w-6/12 absolute right-0 h-screen shadow-lg">
          <div className="mx-32 mt-24 ">
            <h1 className="text-blueTypography text-3xl font-bold">Acessar</h1>
            <form onSubmit={handleSubmit(handleSignIn)}>
              <div className="flex flex-col">
                <div className="flex flex-row mt-12">
                  <div className="mr-6">
                    <input
                      {...register("patient_radio")}
                      id="patient_radio"
                      name="inputRadio"
                      type="radio"
                      className="w-4 bg-blueMain"
                      value="patient"
                      onChange={handleOptionChange}
                    />
                    <label
                      htmlFor="patient_radio"
                      className="ml-2 text-lg font-medium text-blueMain"
                    >
                      Paciente
                    </label>
                  </div>

                  <div className="mr-6">
                    <input
                      {...register("doctor_radio")}
                      id="doctor_radio"
                      name="inputRadio"
                      type="radio"
                      className="w-4 bg-blueMain"
                      value="doctor"
                      onChange={handleOptionChange}
                    />
                    <label
                      htmlFor="doctor_radio"
                      className="ml-2 text-lg font-medium text-blueMain"
                    >
                      Médico
                    </label>
                  </div>

                  <div>
                    <input
                      {...register("admin_radio")}
                      id="admin_radio"
                      name="inputRadio"
                      type="radio"
                      className="w-4 bg-blueMain"
                      value="admin"
                      onChange={handleOptionChange}
                    />
                    <label
                      htmlFor="admin_radio"
                      className="ml-2 text-lg font-medium text-blueMain"
                    >
                      Administrador
                    </label>
                  </div>
                </div>
                {selectedOption == "admin" ? (
                  <div className={`mt-8`}>
                    <div>
                      <label className={` text-xl`} htmlFor="email">
                        E-mail
                      </label>
                      <input
                        className="focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                        {...register("email")}
                        name="email"
                        id="email"
                        type="email"
                      />
                    </div>
                  </div>
                ) : (
                  <div className={`mt-8`}>
                    <div>
                      <label className={` text-xl`} htmlFor="nome">
                        Nome
                      </label>
                      <input
                        className="focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                        {...register("nome")}
                        name="nome"
                        id="nome"
                      />
                    </div>
                  </div>
                )}
                <div className={`mt-12`}>
                  <div>
                    <label className={` text-xl`} htmlFor="password">
                      Senha
                    </label>
                    <input
                      className="focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                      {...register("password")}
                      name="password"
                      id="password"
                      type="password"
                    />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                customClass="bg-blueMain mt-12 text-white"
                name="Entrar"
              />
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
