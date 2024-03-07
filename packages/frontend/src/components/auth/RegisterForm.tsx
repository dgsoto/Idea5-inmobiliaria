"use client"
import { FormProvider, useForm } from "react-hook-form";

import Link from "next/link"
import InputText from "@/components/form/InputText"
import SubmitButton from "@/components/form/SubmitButton"
import { useState } from "react";


type FormData = {
    username: string;
    lastname: string;
    code: number;
    phone: number;
    email: string;
    password: string;
}

const RegisterForm = () => {
    const methods = useForm<FormData>();
    const [errorMessage, setErrorMessage] = useState('');
    
    const { register, handleSubmit, formState : { errors } } = methods;

    const onSubmit = async (data: FormData) => {
        try {
            const response = await fetch('http://localhost:3002/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
      
            if (response.ok) {
              // Usuario creado exitosamente
              console.log('Usuario creado exitosamente');
            } else {
              // Manejar errores de creación de usuario
              const errorData = await response.json();
              setErrorMessage(errorData.error);
            }
          } catch (error) {
            console.error('Error al crear usuario:', error);
          }
    }

    return <FormProvider {...methods}>
        <div className="bg-[#F9F6F6] flex flex-col items-center justify-center rounded-xl w-2/3 shadow-md px-20 py-12">
            <h2 className="text-gray-500">Para registrarte te pediremos algunos datos</h2>
            <span className="text-gray-600 mb-4">Solo te tomara unos minutos crear tu cuenta</span>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputText
                    fieldName="name"
                    placeholder="Nombre *"
                    type="text"
                />
                <InputText
                    fieldName="lastname"
                    placeholder="Apellido *"
                    type="text"
                />
                <div className="flex w-full">
                    <InputText
                        fieldName="code"
                        placeholder="Codigo Pais *"
                        type="text"
                        styles="w-2/5 mr-4"
                    />
                    <InputText
                        fieldName="phone"
                        placeholder="Telefono celular *"
                        type="number"
                        styles="w-3/5"
                    />
                </div>
                <InputText
                    fieldName="email"
                    placeholder="Email *"
                    type="email"
                />
                <InputText
                    fieldName="password"
                    placeholder="Contraseña *"
                    type="password"
                />
                <p className="text-gray-500">La contraseña debe tener <span className="font-bold">al menos 8 caracteres</span> y debe contener al menos <span className="font-bold">una mayuscula, un numero y un caracter especial</span></p>

                <div className="flex gap-4 my-4">
                    <input type="checkbox" />
                    <p>Al registrarme acepto los <span className="text-blue-600">terminos,condiciones y politicas de privacidad</span></p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <SubmitButton
                        label={"Registrarse"}
                        styles="bg-blue-800 text-slate-50 w-3/4 justify-center text-center rounded-xl px-4 py-2"
                        onSubmit={onSubmit}
                    />
                    <p className="text-sm my-2">Si ya tenés cuenta <Link href="/login" className="text-blue-600 text-sm">inicia sesion aca</Link></p>

                </div>
            </form>
        </div>
    </FormProvider>
}

export default RegisterForm