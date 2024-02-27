import Link from "next/link";
import InputText from "../form/InputText";
import SubmitButton from "../form/SubmitButton";

import { BiLogoGoogle } from "react-icons/bi";
import { BiLogoFacebookCircle } from "react-icons/bi";

type FormData = {
    email: string;
}

const LoginForm = () => {
    return <div className="bg-[#F9F6F6] flex flex-col items-center justify-center rounded-xl shadow-md px-20 py-12">
        <h2 className="text-gray-500">Iniciar sesion</h2>
        <span className="text-gray-600 mb-4">Accede a tu cuenta con:</span>
        <form>
            <InputText
                fieldName="email"
                placeholder="martaperez@gmail.com"
                type="email"
            />
            <InputText
                fieldName="password"
                placeholder="Contraseña"
                type="password"
            />
            <div className="flex flex-col items-center justify-center border-gray-300 border-b-2">
                <SubmitButton
                    title="Iniciar sesión"
                    styles="bg-blue-800 text-slate-50"
                />
                <Link href="/login/forgot-password" className="text-blue-600 text-sm py-2">Olvide mi Contraseña</Link>

            </div>

            <div className="flex flex-col items-center justify-center gap-4 py-4">
                <SubmitButton
                    icon={<BiLogoGoogle style={{fontSize:'22px'}}/>}
                    title="Ingresar con Google"
                    styles="flex items-center justify-evenly gap-4 bg-slate-50 border border-blue-800 text-gray-500"
                />

                <SubmitButton
                    icon={<BiLogoFacebookCircle style={{fontSize:'22px'}}/>}
                    title="Ingresar con Facebook"
                    styles="flex items-center justify-evenly gap-4 bg-slate-50 border border-blue-800 text-gray-500"
                />
                <p>No tengo cuenta y quiero <Link href="/register" className="text-blue-700">registarme</Link></p>
            </div>
        </form>
    </div>
}

export default LoginForm;
