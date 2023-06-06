import React from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Register from '../../components/Layout/Register'

const RegisterPage = () => {
  return (
    <>

    <div className="flex flex-row">
      <Sidebar />
      <div className="flex flex-col w-full mr-auto">
        <Header />
        <Register/>
      </div>
    </div>

    </>

  )
}

export default RegisterPage