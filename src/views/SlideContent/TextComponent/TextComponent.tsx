import classes from './TextComponent.module.css'
import {TextElement} from "../../../store/objects.ts";
import React, {CSSProperties} from "react";
import {dispatch} from "../../../store/editor.ts";
import {changeTextValue} from "../../../store/changeTextValue.ts";

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

    const textStyle: CSSProperties = {
        top: `${scale * element.position.y}px`,
        left: `${scale * element.position.x}px`,
        width: `${scale * element.size.width}px`,
        height: `${scale * element.size.height}px`,
        fontFamily: `${element.font}`,
        fontSize: `${scale * element.textSize}px`,
    }

    const onTextValueChange: React.ChangeEventHandler = (event) => {
        dispatch(changeTextValue, {
            elementId: element.id,
            newText: (event.target as HTMLInputElement).value
        });
    }

    return (
        <textarea
               className={classes.text + ' ' + className + ' ' + elementStyle}
               style={textStyle}
               value={element.value}
               draggable={false}
               onChange={onTextValueChange}
               onDrop={(e) => e.preventDefault()}
        />
    )
}

export default TextComponent