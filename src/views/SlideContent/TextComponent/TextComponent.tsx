import classes from './TextComponent.module.css'
import {TextElement} from "../../../store/types.ts";
import React, {CSSProperties} from "react";
import {useAppActions} from "../../hooks/useAppAction.ts";

type TextProps = {
    element: TextElement,
    scale: number,
    className?: string,
    elementStyle?: string,
}

function TextComponent({
                           element,
                           scale,
                           className = '',
                           elementStyle = ''
                       }: TextProps) {

    const {changeTextValue} = useAppActions()

    const textStyle: CSSProperties = {
        top: `${scale * element.position.y}px`,
        left: `${scale * element.position.x}px`,
        width: `${scale * element.size.width}px`,
        height: `${scale * element.size.height}px`,
        fontFamily: `${element.font}`,
        fontSize: `${scale * element.textSize}px`,
    }

    const onTextValueChange: React.ChangeEventHandler = (event) => {
        changeTextValue((event.target as HTMLInputElement).value)
    }

    const onMD = () => {
        console.log('textarea click')
    }

    return (
        <textarea
            readOnly={true}
            className={classes.text + ' ' + className + ' ' + elementStyle}
            style={textStyle}
            value={element.value}
            draggable={false}
            onMouseDown={onMD}
            onChange={onTextValueChange}
            onDrop={(e) => e.preventDefault()}
        />
    )
}

export default TextComponent