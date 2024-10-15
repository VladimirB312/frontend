import classes from "./Button.module.css";

type ButtonProps = {
    text: string,
    onClick?: () => void,
}

function Button(props: ButtonProps) {
    return (
        <button className={classes['button']} onClick={props.onClick}>
            {props.text}
        </button>
    )
}

export default Button