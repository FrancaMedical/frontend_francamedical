import React, { useEffect, useState } from "react";
import ContentMain from "../../ContentMain";
import Image from "next/image";
import Modal from "react-modal";
import Input from "../../Form/Input";
import Button from "../../Form/Button";
import Select from "../../Form/Select";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePatientService } from "@/app/services/patient.service";
import { useDoctorService } from "@/app/services/doctor.service";
import { useConsultService } from "@/app/services/consult.service";
import { Consult } from "@/app/models/Consult";
import { ConfirmDialog } from "primereact/confirmdialog";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";

type ConsultProps = {
  id?: string;
  nomePaciente?: string;
  nomeMedico?: string;
  especialidade?: string;
  dataConsulta?: string;
  horario?: string;
  descricao?: string;
  paciente?: string;
  medico?: string;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#00778D",
    overflow: "auto",
    border: "none",
    borderRadius: "1rem",
    padding: 0,
    width: "30rem",
    height: "25rem",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 50,
  },
};

const QueryList = () => {
  const [patientId, setPatientId] = useState<any>("");
  const [idConsult, setIdConsult] = useState<any>("");
  const [doctorId, setDoctorId] = useState<any>("");
  const [consults, setConsults] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedConsult, setSelectedConsult] = useState<
    ConsultProps | null | any
  >(null);
  const { register, setValue, handleSubmit, reset, watch } =
    useForm<ConsultProps>({
      defaultValues: {
        id: "",
        paciente: "",
        medico: "",
      },
    });
  const serviceConsult = useConsultService();
  const servicePatient = usePatientService();
  const serviceDoctor = useDoctorService();
  const [modalRegister, setModalRegister] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [selectedEspecialidade, setSelectedEspecialidade] =
    useState("Selecione");

  useEffect(() => {
    serviceConsult.GETALL().then((res) => {
      setConsults(res);
      setLoading(false);
    });
  }, []);

  const handlePage = () => {
    serviceConsult.GETALL().then((res: any) => {
      setConsults(res);
    });
  };

  console.log("Consults: ", consults);

  useEffect(() => {
    const fetchPatients = async () => {
      const patients = await servicePatient.GETALL();
      patients.forEach((patient) => {
        if (watch("nomePaciente") === patient.nome) {
          setValue("paciente", patient.id);
          setPatientId(patient.id);
        }
      });
    };

    const fetchDoctors = async () => {
      const doctors = await serviceDoctor.GETALL();
      doctors.forEach((doctor) => {
        if (watch("nomeMedico") === doctor.nome) {
          setValue("medico", doctor.id);
          setDoctorId(doctor.id);
        }
      });
    };

    const fetchConsults = async () => {
      if (idConsult) {
        setValue("id", idConsult);
      }
    };

    fetchPatients();
    fetchDoctors();
    fetchConsults();
  }, [setValue, watch, servicePatient, serviceDoctor]);

  const handleRegister: SubmitHandler<ConsultProps> = (data: ConsultProps) => {
    setValue("id", idConsult);
    setValue("paciente", patientId);
    setValue("medico", doctorId);
    console.log(data);
    serviceConsult.POST(data).then(() => {
      toast.success("Consulta salvo com sucesso!", {
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
      closeModalRegister();
      handlePage();
    });
  };

  const handleUpdate: SubmitHandler<ConsultProps> = (data: ConsultProps) => {
    setValue("id", idConsult);
    setValue("paciente", patientId);
    setValue("medico", doctorId);
    console.log("Data do edit: ", data);
    serviceConsult.PUT(data).then(() => {
      toast.success("Consulta atualizada com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      closeModalEdit();
      handlePage();
    });
  };

  const handleEspecialidadeChange = (event: any) => {
    setSelectedEspecialidade(event.target.value);
  };

  function openModalRegister() {
    setModalRegister(true);
    setSelectedConsult({});
  }

  function openModalView(consult: ConsultProps | any) {
    setModalView(true);
    setSelectedConsult(consult);
    setValue("nomePaciente", consult.nomePaciente);
    setValue("nomeMedico", consult.medico.nome);
    setValue("especialidade", consult.especialidade);
    setValue("descricao", consult.descricao);
    setValue("dataConsulta", consult.dataConsulta);
    setValue("horario", consult.horario);
  }

  function closeModalRegister() {
    setModalRegister(false);
  }

  function openModalEdit(consult: ConsultProps | any) {
    setModalEdit(true);
    setSelectedConsult(consult);
    setIdConsult(consult.id);
    setValue("nomePaciente", consult.nomePaciente);
    setValue("nomeMedico", consult.medico.nome);
    setValue("especialidade", consult.especialidade);
    setValue("descricao", consult.descricao);
    setValue("dataConsulta", consult.dataConsulta);
    setValue("horario", consult.horario);
    console.log("Abriu o editar: ", consult);
  }

  console.log("TESTANDO: ", selectedConsult?.descricao);

  function closeModalEdit() {
    setModalEdit(false);
  }
  function closeModalView() {
    setModalView(false);
  }
  const handleSelectConsult = (consult: ConsultProps) => {
    setSelectedConsult(consult);
  };

  const [saveConsult, setSaveConsult] = useState<string | any>();
  const openConfirmaDelete = (consult: Consult) => {
    setVisible(true);
    setSaveConsult(consult.id);
  };

  const onDelete = () => {
    serviceConsult.DELETE(saveConsult).then(() => {
      handlePage();
      setVisible(false);
    });
  };

  return (
    <ContentMain
      onClick={() => openModalRegister()}
      showHeader={true}
      showButtonAdd={true}
      title="Consultas"
    >
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="loader">Carregando...</div>
        </div>
      ) : (
        <div className="h-full bg-blueLight dark:bg-dark3 rounded-b-md min-h-screen border border-solid border-bg-blueLight dark:border-black">
          <ul>
            {consults.map((res: Consult) => {
              return (
                <>
                  <li
                    key={res.id}
                    onClick={() => handleSelectConsult(res)}
                    className="px-8 py-4 flex justify-between items-center border border-b border-white dark:border-black"
                  >
                    <h1 className="text-xl dark:text-white">
                      Consulta {res.descricao} - {res.nomePaciente}
                    </h1>
                    <div className="flex flex-row items-center">
                      <div className="mr-6 cursor-pointer">
                        <AiOutlineSearch
                          onClick={() => openModalView(res)}
                          className="transition-all duration-500 hover:opacity-75 text-4xl dark:text-white text-blueTypography"
                        />
                      </div>
                      <div className="mr-6 cursor-pointer">
                        <IoMdCreate
                          onClick={() => openModalEdit(res)}
                          className="transition-all duration-500 hover:opacity-75 text-4xl dark:text-white text-blueTypography"
                        />
                      </div>
                      <div className="cursor-pointer">
                        <MdDelete
                          onClick={() => openConfirmaDelete(res)}
                          className="transition-all duration-500 hover:opacity-75 text-4xl dark:text-white text-red-600"
                        />
                        <ConfirmDialog
                          visible={visible}
                          onHide={() => setVisible(false)}
                          message="Deseja mesmo excluir esse registro?"
                          header="Confirmação de exclusão"
                          icon="pi p-error pi-exclamation-triangle"
                          accept={() => onDelete()}
                          reject={() => setVisible(false)}
                          rejectLabel="Não"
                          acceptLabel="Sim"
                        />
                      </div>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      )}

      <div>
        <Modal
          ariaHideApp={false}
          isOpen={modalRegister}
          onRequestClose={closeModalRegister}
          style={customStyles}
          contentLabel="Nova Consulta"
        >
          <div className="flex flex-col z-50">
            <div className=" bg-blueMain w-full rounded-t-xl h-20 flex justify-start items-center">
              <h1 className="text-3xl ml-4 text-white">Nova Consulta</h1>
            </div>

            <div className="bg-blueLight px-8 w-full pb-12">
              <form onSubmit={handleSubmit(handleRegister)}>
                <div className={`mt-8`}>
                  <div className="">
                    <label
                      className={`text-black text-xl`}
                      htmlFor={"nomePaciente"}
                    >
                      {"Nome Completo do Paciente"}
                    </label>
                    <input
                      className="mb-8 focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                      {...register("nomePaciente")}
                      name="nomePaciente"
                      id="nomePaciente"
                      type="text"
                      placeholder="Informe o nome completo do paciente"
                      value={selectedConsult?.nomePaciente}
                    />
                  </div>
                </div>

                <div className={``}>
                  <div className="">
                    <label
                      className={`text-black text-xl`}
                      htmlFor={"nomeMedico"}
                    >
                      {"Nome Completo do Médico"}
                    </label>
                    <input
                      className="mb-8 focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                      {...register("nomeMedico")}
                      name="nomeMedico"
                      id="nomeMedico"
                      type="text"
                      placeholder="Informe o nome completo do médico"
                      value={selectedConsult?.medico?.nome}
                    />
                  </div>
                </div>

                <div>
                  <div className="w-full">
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
                </div>
                <div className={`mt-8`}>
                  <div className="">
                    <label
                      className={`text-black text-xl`}
                      htmlFor={"descricao"}
                    >
                      {"Descrição"}
                    </label>
                    <textarea
                      className="focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                      {...register("descricao")}
                      name="descricao"
                      id="descricao"
                      placeholder="Descrição..."
                      value={selectedConsult?.descricao}
                    />
                  </div>
                </div>
                <div className="flex flex-row ">
                  <div className="mr-8">
                    <div className={`mt-8`}>
                      <div className="">
                        <label
                          className={`text-black text-xl`}
                          htmlFor={"dataConsulta"}
                        >
                          {"Data de Consulta"}
                        </label>
                        <input
                          className="mb-8 focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                          {...register("dataConsulta")}
                          name="dataConsulta"
                          id="dataConsulta"
                          type="date"
                          placeholder="Informe a data"
                          value={selectedConsult?.dataConsulta}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={`mt-8`}>
                      <div className="">
                        <label
                          className={`text-black text-xl`}
                          htmlFor={"horario"}
                        >
                          {"Horário"}
                        </label>
                        <input
                          className="mb-8 focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                          {...register("horario")}
                          name="horario"
                          id="horario"
                          type="time"
                          placeholder="Informe o horário"
                          value={selectedConsult?.horario}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-full mt-12">
                  <div className="w-full flex items-end">
                    <Button
                      onClick={
                        modalRegister ? closeModalRegister : closeModalEdit
                      }
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
              </form>
            </div>
          </div>
        </Modal>

        <Modal
          ariaHideApp={false}
          isOpen={modalEdit}
          onRequestClose={closeModalEdit}
          style={customStyles}
          contentLabel="Consulta X"
        >
          <div className="flex flex-col z-50">
            <div className=" bg-blueMain w-full rounded-t-xl h-20 flex justify-start items-center">
              <h1 className="text-3xl ml-4 text-white">
                Consulta {selectedConsult?.descricao}
              </h1>
            </div>

            <div className="bg-blueLight px-8 w-full pb-12">
              <form onSubmit={handleSubmit(handleUpdate)}>
                <div className={`mt-8`}>
                  <div className="">
                    <label
                      className={`text-black text-xl`}
                      htmlFor={"nomePaciente"}
                    >
                      {"Nome Completo do Paciente"}
                    </label>
                    <input
                      className="mb-8 focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                      {...register("nomePaciente")}
                      name="nomePaciente"
                      id="nomePaciente"
                      type="text"
                      placeholder="Informe o nome completo do paciente"
                    />
                  </div>
                </div>

                <div className={``}>
                  <div className="">
                    <label
                      className={`text-black text-xl`}
                      htmlFor={"nomeMedico"}
                    >
                      {"Nome Completo do Médico"}
                    </label>
                    <input
                      className="mb-8 focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                      {...register("nomeMedico")}
                      name="nomeMedico"
                      id="nomeMedico"
                      type="text"
                      placeholder="Informe o nome completo do médico"
                    />
                  </div>
                </div>

                <div>
                  <div className="w-full">
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
                          <option
                            selected={
                              selectedConsult?.especialidade == "pediatria"
                                ? true
                                : false
                            }
                            value="pediatria"
                          >
                            Pediatria
                          </option>
                          <option
                            selected={
                              selectedConsult?.especialidade == "cardiologia"
                                ? true
                                : false
                            }
                            value="cardiologia"
                          >
                            Cardiologia
                          </option>
                          <option
                            selected={
                              selectedConsult?.especialidade == "ginecologista"
                                ? true
                                : false
                            }
                            value="ginecologista"
                          >
                            Ginecologista
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`mt-8`}>
                  <div className="">
                    <label
                      className={`text-black text-xl`}
                      htmlFor={"descricao"}
                    >
                      {"Descrição"}
                    </label>
                    <textarea
                      className="focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                      {...register("descricao")}
                      name="descricao"
                      id="descricao"
                      placeholder="Descrição..."
                    />
                  </div>
                </div>
                <div className="flex flex-row ">
                  <div className="mr-8">
                    <div className={`mt-8`}>
                      <div className="">
                        <label
                          className={`text-black text-xl`}
                          htmlFor={"dataConsulta"}
                        >
                          {"Data de Consulta"}
                        </label>
                        <input
                          className="mb-8 focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                          {...register("dataConsulta")}
                          name="dataConsulta"
                          id="dataConsulta"
                          type="date"
                          placeholder="Informe a data"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={`mt-8`}>
                      <div className="">
                        <label
                          className={`text-black text-xl`}
                          htmlFor={"horario"}
                        >
                          {"Horário"}
                        </label>
                        <input
                          className="mb-8 focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                          {...register("horario")}
                          name="horario"
                          id="horario"
                          type="time"
                          placeholder="Informe o horário"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-full mt-12">
                  <div className="w-full flex items-end">
                    <Button
                      onClick={
                        modalRegister ? closeModalRegister : closeModalEdit
                      }
                      type="button"
                      customClass="text-black text-opacity-50 uppercase"
                      name="Cancelar"
                    />
                  </div>
                  <div className="w-full flex items-end">
                    <Button
                      type="submit"
                      customClass="text-white bg-blueMain uppercase"
                      name="Atualizar"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal>

        <Modal
          ariaHideApp={false}
          isOpen={modalView}
          onRequestClose={closeModalView}
          style={customStyles}
          contentLabel="Consulta X"
        >
          <div className="flex flex-col z-50">
            <div className=" bg-blueMain w-full rounded-t-xl h-20 flex justify-start items-center">
              <h1 className="text-3xl ml-4 text-white">
                Consulta {selectedConsult?.descricao}
              </h1>
            </div>

            <div className="bg-blueLight px-8 w-full pb-12">
              <form onSubmit={handleSubmit(handleUpdate)}>
                <div className={`mt-8`}>
                  <div className="">
                    <label
                      className={`text-black text-xl`}
                      htmlFor={"nomePaciente"}
                    >
                      {"Nome Completo do Paciente"}
                    </label>
                    <input
                      className="mb-8 focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                      {...register("nomePaciente")}
                      name="nomePaciente"
                      id="nomePaciente"
                      type="text"
                      placeholder="Informe o nome completo do paciente"
                      disabled
                    />
                  </div>
                </div>

                <div className={``}>
                  <div className="">
                    <label
                      className={`text-black text-xl`}
                      htmlFor={"nomeMedico"}
                    >
                      {"Nome Completo do Médico"}
                    </label>
                    <input
                      className="mb-8 focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                      {...register("nomeMedico")}
                      name="nomeMedico"
                      id="nomeMedico"
                      type="text"
                      placeholder="Informe o nome completo do médico"
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <div className="w-full">
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
                          disabled
                          className={`focus:outline-none  w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg`}
                        >
                          <option
                            selected={
                              selectedConsult?.especialidade == "pediatria"
                                ? true
                                : false
                            }
                            value="pediatria"
                          >
                            Pediatria
                          </option>
                          <option
                            selected={
                              selectedConsult?.especialidade == "cardiologia"
                                ? true
                                : false
                            }
                            value="cardiologia"
                          >
                            Cardiologia
                          </option>
                          <option
                            selected={
                              selectedConsult?.especialidade == "ginecologista"
                                ? true
                                : false
                            }
                            value="ginecologista"
                          >
                            Ginecologista
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`mt-8`}>
                  <div className="">
                    <label
                      className={`text-black text-xl`}
                      htmlFor={"descricao"}
                    >
                      {"Descrição"}
                    </label>
                    <textarea
                      className="focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                      {...register("descricao")}
                      name="descricao"
                      id="descricao"
                      placeholder="Descrição..."
                      disabled
                    />
                  </div>
                </div>
                <div className="flex flex-row ">
                  <div className="mr-8">
                    <div className={`mt-8`}>
                      <div className="">
                        <label
                          className={`text-black text-xl`}
                          htmlFor={"dataConsulta"}
                        >
                          {"Data de Consulta"}
                        </label>
                        <input
                          className="mb-8 focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                          {...register("dataConsulta")}
                          name="dataConsulta"
                          id="dataConsulta"
                          type="date"
                          placeholder="Informe a data"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={`mt-8`}>
                      <div className="">
                        <label
                          className={`text-black text-xl`}
                          htmlFor={"horario"}
                        >
                          {"Horário"}
                        </label>
                        <input
                          className="mb-8 focus:outline-none w-full border border-solid border-blueMain rounded-xl p-4 mt-2  bg-blueInput bg-opacity-10 placeholder:text-black placeholder:text-lg text-black text-lg"
                          {...register("horario")}
                          name="horario"
                          id="horario"
                          type="time"
                          placeholder="Informe o horário"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-full mt-12">
                  <div className="w-full flex items-end">
                    <Button
                      onClick={closeModalView}
                      type="button"
                      customClass="text-white bg-blueMain uppercase"
                      name="Voltar"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </ContentMain>
  );
};

export default QueryList;
