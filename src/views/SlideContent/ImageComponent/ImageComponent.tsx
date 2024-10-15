import classes from './ImageComponent.module.css'
import {ImageElement} from "../../../store/objects.ts";
import {CSSProperties} from "react";

type ImageProps = {
    element: ImageElement,
    scale: number
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

    return (
        <img className={classes.image} src={element.src} style={imageStyle}/>
    )
}

export default ImageComponent