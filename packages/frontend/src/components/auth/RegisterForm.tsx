'use client';
import { FormProvider, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import InputText from '@/components/form/InputText';
import SubmitButton from '@/components/form/SubmitButton';


type FormData = {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	phone: string; // Cambiar a string, recuenda que los numeros telefonicos puede tener ceros  ala izquierda
};

const generateUUID = () => { //Agregamos funcion para generar el id, lo ideal es que sea atraves de un servicio
    return uuidv4();
  };

const RegisterForm = () => {
	const methods = useForm<FormData>();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = methods;

	const onSubmit = handleSubmit(async (data: FormData) => {

        const uuid = generateUUID(); // Genera un UUID unico antes de enviar el formulario
        data.id = uuid; // Asigna el UUID generado al campo 'id' en los datos del formulario
    

		const res = await fetch(`http://localhost:3002/api/users`, { //Cambiar la ruta a la que haces fetch, lo ideal es hacerlo atraves de una variable de entorno o una constante
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const resJSON = await res.json();
		console.log(resJSON);
	});

	return (
		<FormProvider {...methods}>
			<div className="bg-[#F9F6F6] flex flex-col items-center justify-center rounded-xl w-2/3 shadow-md px-20 py-12">
				<h2 className="text-gray-500">Para registrarte te pediremos algunos datos</h2>
				<span className="text-gray-600 mb-4">Solo te tomara unos minutos crear tu cuenta</span>
				<form onSubmit={onSubmit}>
                    
					<InputText fieldName="firstname" /* Cambiar name por firstname */ placeholder="Nombre *" type="text" />
					<InputText fieldName="lastname" placeholder="Apellido *" type="text" />
					<div className="flex w-full">
						<InputText fieldName="code" placeholder="Codigo Pais *" type="text" styles="w-2/5 mr-4" />
						<InputText fieldName="phone" placeholder="Telefono celular *" type="number" styles="w-3/5" />
					</div>
					<InputText fieldName="email" placeholder="Email *" type="email" />
					<InputText fieldName="password" placeholder="Contraseña *" type="password" />
					<p className="text-gray-500">
						La contraseña debe tener <span className="font-bold">al menos 8 caracteres</span> y debe
						contener al menos{' '}
						<span className="font-bold">una mayuscula, un numero y un caracter especial</span>
					</p>

					<div className="flex gap-4 my-4">
						<input type="checkbox" />
						<p>
							Al registrarme acepto los{' '}
							<span className="text-blue-600">terminos,condiciones y politicas de privacidad</span>
						</p>
					</div>
					<div className="flex flex-col items-center justify-center">
						<SubmitButton
							label={'Registrarse'}
							styles="bg-blue-800 text-slate-50 w-3/4 justify-center text-center rounded-xl px-4 py-2"
							onSubmit={onSubmit}
						/>
						<p className="text-sm my-2">
							Si ya tenés cuenta{' '}
							<Link href="/login" className="text-blue-600 text-sm">
								inicia sesion aca
							</Link>
						</p>
					</div>
				</form>
			</div>
		</FormProvider>
	);
};

export default RegisterForm;
