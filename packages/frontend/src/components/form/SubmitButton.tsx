import { FieldValues, useFormContext } from "react-hook-form";

type SubmitButtonProps<T> = {
    label: string;
    styles?: string;
    onSubmit: (data: T)=> void;
}

const SubmitButton = <T extends FieldValues,>({ label, styles, onSubmit }: SubmitButtonProps<T>) => {
    const {handleSubmit} = useFormContext<T>();
    return <div className={`${styles ?? ''}`}>
        <button
            onClick={handleSubmit(onSubmit)}
            className="button-primary">
            {label}</button>
    </div>
}

export default SubmitButton