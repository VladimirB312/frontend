import classes from './TextComponent.module.css'
import {TextElement} from "../../../../store/objects.ts";
import {CSSProperties} from "react";

type TextProps = {
    element: TextElement,
    scale: number
}

function TextComponent(props: TextProps) {
    const element = props.element;
    const scale = props.scale;

    const textStyle:CSSProperties = {
        top: `${scale * element.position.x}px`,
        left: `${scale * element.position.y}px`,
        width: `${scale * element.size.width}px`,
        height: `${scale * element.size.height}px`,
        fontFamily: `${element.font}`,
        fontSize: `${scale * element.textSize}px`,
    }

    return (
        <p className={classes.text} style={textStyle}>
            {props.element.value}
        </p>
    )
}

export default TextComponent