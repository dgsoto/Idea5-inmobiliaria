"use client"
import Image from "next/image"

import locacionSvg from "@/assets/locacion.svg"
import logoAgua from "@/assets/logo-agua.png"
import heartInactivo from "@/assets/heart-inactivo.png"
import heartActivo from "@/assets/heart-activo.png"




import { FaCar } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { FaPersonBooth } from "react-icons/fa";
import { FaMedium } from "react-icons/fa";

import { useState } from "react";



const CardProduct = ({ img, price, description, containerStyles, cardStyle }) => {
    const [active, setActive] = useState(false)

    return <div className="flex flex-col items-center relative w-full bg-light-color rounded-lg p-4" style={containerStyles}>

        <div className="relative">

            <Image
                src={img}
                alt="Picture of the author"
            />
            <span className="absolute top-0 left-0">
                <Image
                    src={logoAgua}
                    width={70}
                    height={70}
                    alt="locacion"
                />
            </span>

            <span className="absolute top-0 right-0 cursor-pointer p-2" onClick={() => setActive(!active)}>
                <Image
                    src={active ? heartInactivo : heartActivo}
                    width={50}
                    height={50}
                    alt="locacion"
                />
            </span>

            <span className="absolute bottom-0 right-0 cursor-pointer p-1">
                <Image
                    src={locacionSvg}
                    width={50}
                    height={50}
                    alt="locacion"
                />
            </span>
        </div>

        <div style={cardStyle}>
            <div className="flex flex-col items-start">
                <h4 className="font-bold text-2xl text-left py-2">{price}</h4>
                <p className="text-gray-500">{description}</p>
            </div>
            <div className="flex justify-around gap-5 px-1 py-4">
                <span className="iconCard"><FaCar /></span>
                <span className="iconCard"><FaBuilding /></span>
                <span className="iconCard"><FaPersonBooth /></span>
                <span className="iconCard"><FaMedium /></span>
            </div>
        </div>

    </div>
}

export default CardProduct