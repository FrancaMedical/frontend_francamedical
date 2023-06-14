import React, { useState } from "react";
import ContentMain from "../../ContentMain";
import Button from "../../Form/Button";
import Select from "../../Form/Select";
import { useForm, SubmitHandler } from "react-hook-form";
import { usePatientService } from "@/app/services/patient.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDoctorService } from "@/app/services/doctor.service";

type Address = {
  cep?: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
};

type PatientProps = {
  nome: string;
  tel: string;
  cpf: string;
  dataNascimento: string;
  endereco: Address;
  password: string;
};

type DoctorProps = {
  nome: string;
  tel: string;
  cpf: string;
  dataNascimento: string;
  endereco: Address;
  password: string;
  especialidade: string;
  crm: string;
};

const Register = () => {
  const { register, handleSubmit, reset } = useForm<PatientProps | DoctorProps>(
    {
      defaultValues: {
        endereco: {
          cep: "",
          rua: "",
          numero: "",
          bairro: "",
          cidade: "",
          estado: "",
        },
      },
    }
  );
  const [selectedOption, setSelectedOption] = useState("patient");
  const [selectedEspecialidade, setSelectedEspecialidade] =
    useState("Selecione");
  const servicePatient = usePatientService();
  const serviceDoctor = useDoctorService();

  const handleRegister: SubmitHandler<PatientProps | DoctorProps> = (
    data: PatientProps | DoctorProps
  ) => {
    if (selectedOption == "patient") {
      console.log(data);
      servicePatient.POST(data).then(() => {
        toast.success("Paciente salvo com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        reset();
      });
    }

    if (selectedOption == "doctor") {
      serviceDoctor.POST(data).then(() => {
        console.log(data);
        toast.success("Médico salvo com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        reset();
      });
    }
  };
  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  const handleEspecialidadeChange = (event: any) => {
    setSelectedEspecialidade(event.target.value);
  };
  return (
    <ContentMain showHeader={true} showButtonAdd={false} title="Cadastro">
      <div className="bg-blueLight dark:bg-dark3 min-h-screen pb-24 ">
        <div className="flex flex-row ">
          <form
            className="flex flex-row w-full"
            onSubmit={handleSubmit(handleRegister)}
          >
            <div className="pl-24 flex flex-row w-full ">
              <div className="w-full">
                <Select
                  customClass="mt-12"
                  title="Cadastro de usuário"
                  id="registerUser"
                  name="registerUser"
                  onChange={handleOptionChange}
                  options={
                    <>
                      <option value="patient">Paciente</option>
                      <option value="doctor">Médico</option>
                    </>
                  }
                />
                <div className="mt-8 w-full">
                  <div className="w-full">
                    <label
                      className={` text-xl dark:text-white`}
                      htmlFor="nome"
                    >
                      Nome Completo
                    </label>
                    <input
                      className="dark:text-white focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                      {...register("nome")}
                      name="nome"
                      id="nome"
                    />
                  </div>
                </div>

                <div className="mt-8 w-full">
                  <div className="w-full">
                    <label className={` text-xl dark:text-white`} htmlFor="cpf">
                      CPF
                    </label>
                    <input
                      className="dark:text-white focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                      {...register("cpf")}
                      name="cpf"
                      id="cpf"
                    />
                  </div>
                </div>

                <div className="mt-8 w-full">
                  <div className="w-full">
                    <label
                      className={`dark:text-white text-xl`}
                      htmlFor="dataNascimento"
                    >
                      Data de nascimento
                    </label>
                    <input
                      className="dark:text-white focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                      {...register("dataNascimento")}
                      name="dataNascimento"
                      id="dataNascimento"
                      type="date"
                    />
                  </div>
                </div>

                <div className="mt-8 w-full">
                  <div className="w-full">
                    <label className={` text-xl dark:text-white`} htmlFor="tel">
                      Telefone
                    </label>
                    <input
                      className="dark:text-white focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                      {...register("tel")}
                      name="tel"
                      id="tel"
                    />
                  </div>
                </div>
                {selectedOption == "doctor" && (
                  <>
                    <div className="mt-8 w-full">
                      <div className="w-full">
                        <label className={` text-xl`} htmlFor="crm">
                          CRM
                        </label>
                        <input
                          className="focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                          {...register("crm")}
                          name="crm"
                          id="crm"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="pl-12 pr-24 flex flex-row w-full mt-12 ">
              <div className="w-full">
                <div className="">
                  <div className="w-full">
                    <label className={` text-xl dark:text-white`} htmlFor="cep">
                      CEP
                    </label>
                    <input
                      className="dark:text-white focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                      {...register("endereco.cep")}
                      name="endereco.cep"
                      id="cep"
                    />
                  </div>
                </div>

                <div className="mt-8 w-full">
                  <div className="w-full">
                    <label className={` dark:text-white text-xl`} htmlFor="rua">
                      Rua
                    </label>
                    <input
                      className="dark:text-white focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                      {...register("endereco.rua")}
                      name="endereco.rua"
                      id="rua"
                    />
                  </div>
                </div>

                <div className="flex flex-row">
                  <div className="mt-8 mr-5 w-full">
                    <div className="w-full">
                      <label
                        className={` dark:text-white text-xl`}
                        htmlFor="numero"
                      >
                        Número
                      </label>
                      <input
                        className="dark:text-white focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                        {...register("endereco.numero")}
                        name="endereco.numero"
                        id="numero"
                      />
                    </div>
                  </div>
                  <div className="mt-8 w-full">
                    <div className="w-full">
                      <label
                        className={` dark:text-white text-xl`}
                        htmlFor="bairro"
                      >
                        Bairro
                      </label>
                      <input
                        className="dark:text-white focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                        {...register("endereco.bairro")}
                        name="endereco.bairro"
                        id="bairro"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-row">
                  <div className="mt-8 mr-5 w-full">
                    <div className="w-full">
                      <label
                        className={`dark:text-white text-xl`}
                        htmlFor="cidade"
                      >
                        Cidade
                      </label>
                      <input
                        className="dark:text-white focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                        {...register("endereco.cidade")}
                        name="endereco.cidade"
                        id="cidade"
                      />
                    </div>
                  </div>
                  <div className="mt-8 w-full">
                    <div className="w-full">
                      <label
                        className={`dark:text-white text-xl`}
                        htmlFor="estado"
                      >
                        Estado
                      </label>
                      <input
                        className="dark:text-white focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                        {...register("endereco.estado")}
                        name="endereco.estado"
                        id="estado"
                      />
                    </div>
                  </div>
                </div>

                {selectedOption == "doctor" && (
                  <div className="mt-8 w-full">
                    <div className="w-full">
                      <div className={`flex flex-col`}>
                        <label className="text-xl" htmlFor="">
                          Especialidade
                        </label>
                        <select
                          {...register("especialidade")}
                          id="especialidade"
                          name="especialidade"
                          onChange={handleEspecialidadeChange}
                          className={`focus:outline-none  w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg`}
                        >
                          <option value="pediatria">Pediatria</option>
                          <option value="cardiologia">Cardiologia</option>
                          <option value="ginecologista">Ginecologista</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {selectedOption == "doctor" && (
                  <div className="mt-8 w-full">
                    <div className="w-full">
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
                )}

                <div className="flex flex-row mt-24">
                  <div className="flex flex-row w-full">
                    <div className="w-full flex items-end">
                      <Button
                        type="button"
                        customClass="text-black text-opacity-50 uppercase"
                        name="Cancelar"
                      />
                    </div>
                    <div className="w-full flex items-end">
                      <Button
                        type="submit"
                        customClass="text-white bg-blueMain uppercase"
                        name="Cadastrar"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ContentMain>
  );
};

export default Register;
