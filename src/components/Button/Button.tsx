import classes from "./Button.module.css";

type ButtonProps = {
    text: string,
    onClick?: () => void,
    disabled?: boolean,
}

function Button({text, onClick, disabled = false}: ButtonProps) {
    return (
        <button className={classes['button']}
                onClick={onClick}
                disabled={disabled}>
            {text}
        </button>
    )
}

export default Button