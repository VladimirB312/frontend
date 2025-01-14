import classes from "./Button.module.css";
import {CSSProperties} from "react";

type ButtonProps = {
    text?: string,
    onClick?: () => void,
    disabled?: boolean,
    icon?: string,
    title?: string,
    customStyle?: CSSProperties,
}

const Button = ({
                    text,
                    onClick,
                    disabled = false,
                    icon,
                    title,
                    customStyle
                }: ButtonProps) => {
    return (
        <button className={`${classes.button} ${disabled ? classes.buttonDisabled : '' }`}
                onClick={onClick}
                disabled={disabled}
                title={title}
                style={customStyle}
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