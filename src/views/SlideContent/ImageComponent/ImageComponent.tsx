import classes from './ImageComponent.module.css'
import {ImageElement} from "../../../store/objects.ts";
import {CSSProperties} from "react";
import {dispatch} from "../../../store/editor.ts";
import {setSelectionElement} from "../../../store/setSelection.ts";

type ImageProps = {
    element: ImageElement,
    scale: number,
    className?: string,
    elementStyle?: string,
}

function ImageComponent(props: ImageProps) {
    const element = props.element;
    const scale = props.scale;

    const imageStyle: CSSProperties = {
        top: `${scale * element.position.x}px`,
        left: `${scale * element.position.y}px`,
        width: `${scale * element.size.width}px`,
        height: `${scale * element.size.height}px`,
    }

    const onImageClick = () => {
        dispatch(setSelectionElement, {
            elementId: props.element.id
        })
    }

    return (
        <img className={classes.image + ' ' + props.className + ' ' + props.elementStyle}
             src={element.src}
             style={imageStyle}
             onClick={onImageClick}/>
    )
}

export default ImageComponent