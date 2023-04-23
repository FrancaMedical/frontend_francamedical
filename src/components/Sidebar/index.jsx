import React from 'react'
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  return (
   <aside className='bg-blueMain min-h-screen h-full  fixed left-0'>
    <div className='mt-44 h-full'>
        <ul className='w-24 h-full '>
            <Link href='/QueryList'>
            <li className={router.pathname == '/QueryList' ? 'cursor-pointer mb-12 flex flex-col items-center bg-whiteEdited py-4' : 'cursor-pointer mb-12 flex flex-col items-center py-4'}>
            <Image src={router.pathname == '/QueryList' ? 'img/SidebarIcons/ConsultasVector_Active.svg' : 'img/SidebarIcons/ConsultasVector.svg'} width={36} height={36}/>
            </li>
            </Link>
            <Link href='/Schedule'>
            <li className={router.pathname == '/Schedule' ? 'cursor-pointer mb-12 flex flex-col items-center bg-whiteEdited py-4' : 'cursor-pointer mb-12 flex flex-col items-center py-4'}>
            <Image src={router.pathname == '/Schedule' ? 'img/SidebarIcons/AgendaVector_Active.svg' : 'img/SidebarIcons/AgendaVector.svg'} width={36} height={36}/>
            </li>
            </Link>
           <Link href='/Register'>
           <li className={router.pathname == '/Register' ? 'cursor-pointer mb-12 flex flex-col items-center bg-whiteEdited py-4' : 'cursor-pointer mb-12 flex flex-col items-center py-4'}>
            <Image src={router.pathname == '/Register' ? 'img/SidebarIcons/CadastroVector_Active.svg' : 'img/SidebarIcons/CadastroVector.svg'} width={36} height={36}/>
            </li>
           </Link>
            <li className='cursor-pointer flex flex-col items-center'>
            <Image src="img/SidebarIcons/ConfigVector.svg" width={36} height={36}/>
            </li>
        </ul>
    </div>
   </aside>
  )
}

export default Sidebar