
type SubmitButtonProps = {
    title: string;
    styles?: string;
    icon?: React.ReactNode;
}

const SocialLoginButton = ({title, styles, icon}: SubmitButtonProps) => {
    return <button className={`flex w-3/4 justify-center rounded-xl px-4 py-2 ${styles ?? ''}`}>
        {icon ? <span>{icon}</span> : ''}
        <p>{title}</p>
    </button>
}

export default SocialLoginButton