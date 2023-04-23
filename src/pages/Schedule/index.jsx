import React from 'react'
import Schedule from '../../components/Layout/Schedule'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

const SchedulePage = () => {
  return (
    <>

    <div className="flex flex-row">
      <Sidebar />
      <div className="flex flex-col w-full mr-auto">
        <Header />
        <Schedule/>
      </div>
    </div>

    </>

  )
}

export default SchedulePage