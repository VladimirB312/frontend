import classes from './ImageComponent.module.css'
import {ImageElement} from "../../../store/types.ts";
import {CSSProperties} from "react";

type ImageProps = {
    element: ImageElement,
    scale: number,
    className?: string,
    elementStyle?: string,
}

const ImageComponent = ({
                            element,
                            scale,
                            className = '',
                            elementStyle = ''
                        }: ImageProps) => {

    const imageStyle: CSSProperties = {
        top: `${scale * element.position.y}px`,
        left: `${scale * element.position.x}px`,
        width: `${scale * element.size.width}px`,
        height: `${scale * element.size.height}px`,
        opacity: `${element.opacity}`,
    }

    return (
        <img className={classes.image + ' ' + className + ' ' + elementStyle}
             src={element.src}
             style={imageStyle}
             draggable={false}
        />
    )
}

export {ImageComponent}