type InputTextProps = {
    fieldName: string;
    placeholder?: string;
    styles?: string;
    type: 'text' | 'password' | 'email' | 'number';
}

const InputText = ({ type, placeholder, styles }: InputTextProps) => {
    return (
        <div className={`flex flex-col ${styles ?? ''}`}>
            <input
                className="w-full mb-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none px-16 py-2"
                type={type} 
                placeholder={placeholder}
            />
        </div>
    );
}

export default InputText;