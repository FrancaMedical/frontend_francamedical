import React from 'react'
import Image from "next/image";

const Header = () => {
  return (
    <header className=' bg-blueMain w-full fixed top-0 z-20'>
       <div className='flex justify-center items-center relative'>
      <div className=''>
      <Image src="img/FrancaMedicalLogo.svg" width={250} height={250}/>
      </div>
      <div className='absolute right-10'>
      <Image src="img/VectorProfile.svg" width={60} height={60}/>
      </div>
       </div>
    </header>
  )
}

export default Header