import classes from "./Button.module.css"

type ButtonProps = {
    text?: string,
    onClick?: () => void,
    disabled?: boolean,
    icon?: string,
    title?: string,
    className?: string,
    hoverClassName?: string,
}

const Button = ({
                    text,
                    onClick,
                    disabled = false,
                    icon,
                    title,
                    className,
                    hoverClassName,
                }: ButtonProps) => {
    return (
        <button className={`${classes.button} ${disabled ? classes.buttonDisabled : ''} ${className} ${hoverClassName}`}
                onClick={onClick}
                disabled={disabled}
                title={title}
        >
            {icon &&
                <img
                    className={classes.img + ' ' + `${disabled ? classes.imgDisabled : ''}`}
                    src={icon}
                >
                </img>}
            {text}
        </button>
    )
}

export {Button}