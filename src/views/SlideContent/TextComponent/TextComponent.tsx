import classes from './TextComponent.module.css'
import {TextElement} from "../../../store/objects.ts";
import React, {CSSProperties} from "react";
import {dispatch} from "../../../store/editor.ts";
import {changeTextValue} from "../../../store/changeTextValue.ts";
import {setSelectionElement} from "../../../store/setSelection.ts";

type TextProps = {
    element: TextElement,
    scale: number,
    className?: string,
    elementStyle?: string,
}

function TextComponent(props: TextProps) {
    const element = props.element;
    const scale = props.scale;

    const textStyle: CSSProperties = {
        top: `${scale * element.position.x}px`,
        left: `${scale * element.position.y}px`,
        width: `${scale * element.size.width}px`,
        height: `${scale * element.size.height}px`,
        fontFamily: `${element.font}`,
        fontSize: `${scale * element.textSize}px`,
    }

    const onTextValueChange: React.ChangeEventHandler = (event) => {
        dispatch(changeTextValue, {
            elementId: props.element.id,
            newText: (event.target as HTMLInputElement).value
        });
    }

    const onTextClick = () => {
        dispatch(setSelectionElement, {
            elementId: props.element.id
        })
    }

    return (
        <input type='text'
               className={classes.text + ' ' + props.className + ' ' + props.elementStyle}
               style={textStyle}
               value={props.element.value}
               onChange={onTextValueChange}
               onClick={onTextClick}
        />
    )
}

export default TextComponent