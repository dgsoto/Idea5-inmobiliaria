import InputText from "@/components/form/InputText";
import SubmitButton from "@/components/form/SubmitButton";

const ForgotPassword = () => {
    return <div className="flex justify-center py-12">
        <div className="bg-[#F9F6F6] flex flex-col items-center justify-center rounded-xl shadow-md px-20 py-12">
            <h2 className="text-gray-500 mb-10">Recuperar contraseña</h2>
            <span className="text-gray-600 mb-10">Ingresa tu correo electronico y te enviaremos un
            <br></br>
            mail con instrucciones para recuperar la contraseña</span>
            <form>
                <InputText
                    fieldName="email"
                    placeholder="martaperez@gmail.com"
                    type="email"
                />
                <div className="flex flex-col items-center justify-center gap-6">
                    <SubmitButton
                        title="Enviar"
                        styles="bg-blue-800 text-slate-50"
                    />
                    <SubmitButton
                        title="Iniciar sesión"
                        styles="bg-gray-50 border border-gray-300 text-blue-800"
                    />
                </div>
            </form>
        </div>
    </div>
}

export default ForgotPassword;