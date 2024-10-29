import classes from './ImageComponent.module.css'
import {ImageElement} from "../../../store/objects.ts";
import {CSSProperties} from "react";

type ImageProps = {
    element: ImageElement,
    scale: number,
    className?: string,
    elementStyle?: string,
}

function ImageComponent({
                            element,
                            scale,
                            className = '',
                            elementStyle = ''
                        }: ImageProps) {

    const imageStyle: CSSProperties = {
        top: `${scale * element.position.y}px`,
        left: `${scale * element.position.x}px`,
        width: `${scale * element.size.width}px`,
        height: `${scale * element.size.height}px`,
    }

    return (
        <img className={classes.image + ' ' + className + ' ' + elementStyle}
             src={element.src}
             style={imageStyle}
             draggable={false}
        />
    )
}

export default ImageComponent