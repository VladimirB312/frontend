import classes from './SelectableElement.module.css'
import {ImageElement, TextElement} from "../../../store/objects.ts";
import TextComponent from "../TextComponent/TextComponent.tsx";
import ImageComponent from "../ImageComponent/ImageComponent.tsx";
import {CSSProperties, useEffect, useRef, useState} from "react";
import {dispatch} from "../../../store/editor.ts";
import {setSelectionElement} from "../../../store/setActiveSlide.ts";
import {changePosition} from "../../../store/changePosition.ts";

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
    const [position, setPosition] = useState(element.position)

    let startPos = position

    useEffect(() => {
        if (elementRef.current) {
            elementRef.current.addEventListener('mousedown', onMouseDown)
        }
        return () => {
            if (elementRef.current) {
                elementRef.current.removeEventListener('mousedown', onMouseDown)
            }
        }

    }, [position]);

    const onMouseDown = (e) => {
        startPos = {x: e.pageX, y: e.pageY}
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    const onMouseMove = (e) => {
        const delta = {x: e.pageX - startPos.x, y: e.pageY - startPos.y}
        const newPos = {x: position.x + delta.x, y: position.y + delta.y}
        setPosition(newPos)
    }

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
        dispatch(changePosition, position)
    }

    const borderStyle: CSSProperties = {
        top: `${scale * position.y}px`,
        left: `${scale * position.x}px`,
        width: `${scale * element.size.width}px`,
        height: `${scale * element.size.height}px`,
    }

    if (element.id == selectedElementId) {
        borderStyle.border = '2px solid #5F5F7CFF'
        borderStyle.backgroundColor = 'rgba(0, 0, 0, 0.1)'
    } else {
        borderStyle.border = 'none'
    }

    const onElementClick = () => {
        dispatch(setSelectionElement, {
            elementId: element.id
        })
    }

    return (
        <div ref={elementRef}
             className={classes.element}
             style={borderStyle}
             onClick={onElementClick}
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
        </div>
    )


}