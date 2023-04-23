import Image from "next/image";
import Input from '../Form/Input';
import Button from '../Form/Button';
import Link from "next/link";

export default function Login() {
    return (
        <main className="h-screen w-full">
          <div className="flex flex-row relative">
          <section className="bg-blueMain w-7/12 h-screen z-0">
            <div className="flex justify-center -ml-36 items-center h-full">

       
            <Image src="img/Logo.svg" width={500} height={500}/>
            </div>
        
            </section>

            <section className="bg-whiteEdited rounded rounded-l-teste w-6/12 absolute right-0 h-screen shadow-lg">
                <div className="mx-32 mt-24 ">
                
                  <h1 className="text-blueTypography text-3xl font-bold">Acessar</h1>
  
                <div className="flex flex-col">
                <Input customClass='w-full text-blueTypography' name='Usuário'/>
                <Input customClass='w-full text-blueTypography' name='Senha'/>
                <Link href='/QueryList'>
                <Button customClass='mt-12 text-white bg-blueMain' name='Entrar'/>
                </Link>
                </div>
                </div>
            </section>
       
          </div>
        </main>
    )
}