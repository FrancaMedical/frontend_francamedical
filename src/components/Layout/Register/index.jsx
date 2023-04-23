import React from 'react'
import ContentMain from '../../ContentMain'
import Input from '../../Form/Input';
import Button from '../../Form/Button';
import Select from '../../Form/Select';

const Register = () => {
  return (
    <ContentMain showHeader={true} showButtonAdd={false} title="Cadastro">
            <div className='bg-blueLight min-h-screen pb-24'>
           <div className='flex flex-col items-center mx-32'>
           <form action="">
          <div className='flex flex-row'>
            <div className='mr-44 w-full'>
            <Select 
            title='Cadastro de usuário'
            id='registerUser'
            name='registerUser'
            options={
                <>
                    <option value={Number(1)}>Paciente</option>
                    <option value={Number(2)}>Médico</option>
                    <option value={Number(3)}>Administrador</option>
                </>
            }
            />
            {/* <Input placeholder='Paciente' customClass='text-black' name='Cadastro de usuário'/> */}
            </div>
           <div className='w-full'>
           <Input placeholder='Informe o CEP' customClass='text-black' name='CEP'/>
           </div>
          </div>
          <div className='flex flex-row'>
            <div className='mr-44 w-full'>
            <Input placeholder='Informe o nome completo' customClass='text-black' name='Nome completo'/>
            </div>
           <div className='w-full'>
           <Input placeholder='Informe a rua' customClass='text-black' name='Rua'/>
           </div>
          </div>
          <div className='flex flex-row'>
            <div className='mr-44 w-full'>
            <Input placeholder='Informe o CPF' customClass='text-black' name='CPF'/>
            </div>
           <div className='flex flex-row w-full'>
          <div className='mr-12'>
          <Input placeholder='Informe o número' customClass='text-black' name='Número'/>
          </div>
           <div>
           <Input placeholder='Informe o bairro' customClass='text-black' name='Bairro'/>
           </div>
           </div>
          </div>
          <div className='flex flex-row'>
            <div className='mr-44 w-full'>
            <Input type='date' customClass='text-black' name='Data de nascimento'/>
            </div>
           <div className='flex flex-row w-full'>
          <div className='mr-12'>
          <Input placeholder='Informe a cidade' customClass='text-black' name='Cidade'/>
          </div>
           <div>
           <Input placeholder='Informe o estado' customClass='text-black' name='Estado'/>
           </div>
           </div>
          </div>
          <div className='flex flex-row'>
            <div className='mr-44 w-full'>
            <Input placeholder='Informe o telefone' customClass='text-black' name='Telefone'/>
            </div>
           <div className='flex flex-row w-full'>
           <div className='w-full flex items-end'>
           <Button customClass='text-black text-opacity-50 uppercase' name='Cancelar'/>
           </div>
           <div className='w-full flex items-end'>
           <Button customClass='text-white bg-blueMain uppercase' name='Cadastrar'/>
           </div>
           </div>
          </div>
           </form>
           </div>
            </div>
    </ContentMain>
  )
}

export default Register