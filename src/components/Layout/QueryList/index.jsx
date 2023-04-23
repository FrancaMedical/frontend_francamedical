import React, {useState} from 'react'
import ContentMain from '../../ContentMain'
import Image from "next/image";
import Modal from 'react-modal';
import Input from '../../Form/Input';
import Button from '../../Form/Button';
import Select from '../../Form/Select';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#00778D',
    overflow: 'auto',
    border: 'none',
    borderRadius: '1rem',
    padding: 0,
    width: '30rem',
  },
  overlay: {

    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 50
  }
};

const QueryList = () => {
  let subtitle;
  const [modalRegister, setModalRegister] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  function openModalRegister() {
    setModalRegister(true);
  }

  function closeModalRegister() {
    setModalRegister(false);
  }

  function openModalEdit() {
    setModalEdit(true);
  }

  function closeModalEdit() {
    setModalEdit(false);
  }
  return (
    <ContentMain onClick={() => openModalRegister()} showHeader={true} showButtonAdd={true} title='Consultas'>
        <div className='h-full bg-blueLight rounded-b-md min-h-screen'>
       <ul>
        <li className='px-8 py-4 flex justify-between items-center border border-b border-white'>
        <h1 className='text-2xl'>Consulta 24/03/2023 14h00 - Paciente John Doe </h1>
        <div className='flex flex-row items-center'>
        <div className='mr-6 cursor-pointer'>
        <Image className='transition-all duration-500 hover:opacity-75' src="img/VectorSearch.svg" width={24} height={24}/>
        </div>
        <div className='mr-6 cursor-pointer'>
        <Image onClick={() => openModalEdit()} className='transition-all duration-500 hover:opacity-75' src="img/VectorEdit.svg" width={24} height={24}/>
        </div>
        <div className='cursor-pointer'>
        <Image className='transition-all duration-500 hover:opacity-75' src="img/VectorDelete.svg" width={24} height={24}/>
        </div>
        </div>
        </li>
       </ul>
        </div>
        <div>
      <Modal
        isOpen={modalRegister}
        onRequestClose={closeModalRegister}
        style={customStyles}
        contentLabel="Nova Consulta"
      >

    <div className='flex flex-col z-50'>
    <div className=' bg-blueMain w-full rounded-t-xl h-20 flex justify-start items-center'>
      <h1 className='text-3xl ml-4 text-white'>Nova Consulta</h1>
    </div>

    <div className='bg-blueLight px-8 w-full pb-12'>
    <form action="
    ">
   
           <div>
           <Input placeholder='Informe o nome completo' customClass='text-black' name='Nome completo'/>
           </div>
           <div>
           <Select 
            title='Especialidade Médica'
            id='especialidade'
            name='especialidade'
            options={
                <>
                    <option value={Number(1)}>Radiologia</option>
                </>
            }
            />
           </div>
           <div className='flex flex-row '>
           <div className='mr-8'>
           <Input type='date' customClass='text-black' name='Data da Consulta'/>
           </div>
           <div>
           <Input type='time' customClass='text-black' name='Horário'/>
           </div>
           </div>
           <div className='flex flex-row w-full mt-12'>
           <div className='w-full flex items-end'>
           <Button customClass='text-black text-opacity-50 uppercase' name='Cancelar'/>
           </div>
           <div className='w-full flex items-end'>
           <Button customClass='text-white bg-blueMain uppercase' name='Cadastrar'/>
           </div>
           </div>

        
          
    </form>
    </div>
    </div>

      </Modal>


      <Modal
        isOpen={modalEdit}
        onRequestClose={closeModalEdit}
        style={customStyles}
        contentLabel="Consulta X"
      >

    <div className='flex flex-col z-50'>
    <div className=' bg-blueMain w-full rounded-t-xl h-20 flex justify-start items-center'>
      <h1 className='text-3xl ml-4 text-white'>Consulta X</h1>
    </div>

    <div className='bg-blueLight px-8 w-full pb-12'>
    <form action="
    ">
   
           <div>
           <Input placeholder='Informe o nome completo' customClass='text-black' name='Nome completo'/>
           </div>
           <div>
           <Select 
            title='Especialidade Médica'
            id='especialidade'
            name='especialidade'
            options={
                <>
                    <option value={Number(1)}>Radiologia</option>
                </>
            }
            />
           </div>
           <div className='flex flex-row '>
           <div className='mr-8'>
           <Input type='date' customClass='text-black' name='Data da Consulta'/>
           </div>
           <div>
           <Input type='time' customClass='text-black' name='Horário'/>
           </div>
           </div>
           <div className='flex flex-row w-full mt-12'>
           <div className='w-full flex items-end'>
           <Button customClass='text-black text-opacity-50 uppercase' name='Cancelar'/>
           </div>
           <div className='w-full flex items-end'>
           <Button customClass='text-white bg-blueMain uppercase' name='Salvar'/>
           </div>
           </div>

        
          
    </form>
    </div>
    </div>

      </Modal>
    </div>
    </ContentMain>
  )
}

export default QueryList