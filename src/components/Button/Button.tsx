import classes from "../../views/WorkArea/SlideArea/SlideArea.module.css";

type ButtonProps = {
    size?: {
        width: number,
        height: number
    },
    text: string,
    color?: string,
}

function Button(props: ButtonProps) {
    // @ts-ignore
    const buttonWidth = props.size.width || '20px';
    // @ts-ignore
    const buttonHeight = props.size.height || '10px';
    const buttonStyle = {
        width: buttonWidth,
        height: buttonHeight,
        color: props.color,
    }

    return (
        <button className={classes['button']} style={buttonStyle}>
            {props.text}
        </button>
    )
}

export default Button