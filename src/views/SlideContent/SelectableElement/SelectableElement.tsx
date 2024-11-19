import classes from './SelectableElement.module.css'
import {ImageElement, TextElement} from "../../../store/objects.ts";
import TextComponent from "../TextComponent/TextComponent.tsx";
import ImageComponent from "../ImageComponent/ImageComponent.tsx";
import {CSSProperties, useRef} from "react";
import {useDragAndDrop} from "../../../hooks/useDragAndDropElement.tsx";

type SelectableElementProps = {
    element: TextElement | ImageElement,
    selectedElementId?: string | null,
    scale: number,
    elementStyle?: string,
}


export function SelectableElement({
                                      element,
                                      scale = 1,
                                      elementStyle,
                                      selectedElementId
                                  }: SelectableElementProps) {

    const elementRef = useRef<HTMLDivElement>(null)

    const pos = useDragAndDrop(elementRef, element)


    const borderStyle: CSSProperties = {
        top: `${scale * pos.y}px`,
        left: `${scale * pos.x}px`,
        width: `${scale * element.size.width}px`,
        height: `${scale * element.size.height}px`,
    }

    if (element.id == selectedElementId) {
        borderStyle.border = '2px solid #5F5F7CFF'
        borderStyle.backgroundColor = 'rgba(0, 0, 0, 0.1)'
    } else {
        borderStyle.border = 'none'
    }

    return (
        <div ref={elementRef}
             className={classes.element}
             style={borderStyle}
        >
            {element.type == 'text'
                ? <TextComponent
                    element={element}
                    scale={scale}
                    elementStyle={elementStyle}
                />
                : <ImageComponent
                    element={element}
                    scale={scale}
                    elementStyle={elementStyle}
                />
            }
            <div className={classes.dot1}></div>
            <div className={classes.dot2}></div>
            <div className={classes.dot3}></div>
            <div className={classes.dot4}></div>
        </div>
    )


}