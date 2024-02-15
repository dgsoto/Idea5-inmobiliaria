import Image from "next/image"
import locationImg from "@/assets/location.png"
import m2Img from "@/assets/m2.png"
import batImg from "@/assets/bat.png"




const CardContainer = ({ title, price, location, info, bat, description, image, imageContainer }) => {
    return <>
        <div className="bg-[#B595DB] rounded-2xl relative w-2/3 p-4">
            <div className="px-10">
                <h3 className="text-light-color font-bold text-2xl my-2">{title}</h3>
                <span className="text-light-color font-bold text-2xl my-2">{price}</span>

                <div className="grid grid-cols-12">
                    <div className="col-span-6 flex flex-col gap-3 py-8">
                        <span className="icon-description"><Image src={locationImg} width={35} height={35} className="object-cover" />{location}</span>
                        <span className="icon-description"><Image src={m2Img} width={35} height={35} className="object-cover" />{info}</span>
                        <span className="icon-description"><Image src={batImg} width={35} height={35} className="object-cover" />{bat}</span>
                    </div>

                    <div className="col-span-6 flex flex-col justify-between px-16">
                        <p>{description}</p>
                        <button className="bg-secondary-color px-10 py-4 rounded-xl self-end"></button>
                    </div>
                </div>
                    <div className="flex items-center absolute" style={imageContainer}>
                        <Image src={image} width={400} height={400} className="object-cover"/>
                    </div>

            </div>
        </div>

    </>
}

export default CardContainer