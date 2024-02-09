import Link from "next/link";
import Image from "next/image"

import { BiSolidUser } from "react-icons/bi";
import logo from "@/assets/logo.svg"


const Navbar = () => {
  return <header>
        <nav className="flex items-center justify-between bg-light-color px-8 py-2">
            <div>
            <Image
                src={logo}
                width={70}
                height={70}
                alt="logo"
            />
            </div>

            <div className="">
                <ul className="flex gap-6 text-primary-color font-bold">
                    <li>Home</li>
                    <li>Nosotros</li>
                    <li>Contacto</li>
                    <li>Mi Perfil</li>
                    <li>Publicar</li>
                </ul>
            </div>
        
            <div>
                <Link href="#" className="flex items-center gap-1 bg-secondary-color font-semibold px-4 py-2 rounded-2xl">
                    <BiSolidUser /> Iniciar sesion
                </Link>
            </div>
        </nav>
    </header>
  
}

export default Navbar