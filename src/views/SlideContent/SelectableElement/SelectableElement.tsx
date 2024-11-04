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

type Position = {
    x: number,
    y: number
}

export function SelectableElement({
                                      element,
                                      scale = 1,
                                      elementStyle,
                                      selectedElementId
                                  }: SelectableElementProps) {

    const elementRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState<Position>(element.position)
    const [dndPosition, setDndPosition] = useState<Position>(null)

let pos = dndPosition ? dndPosition : element.position

    useEffect(() => {

        if (elementRef.current) {
            elementRef.current.addEventListener('mousedown', onMouseDown)
        }
        return () => {
            if (elementRef.current) {
                elementRef.current.removeEventListener('mousedown', onMouseDown)
            }
        }

    },[position, dndPosition]);

    let startPos: Position = {x: 0, y: 0}

    const onMouseDown = (e: MouseEvent) => {
        dispatch(setSelectionElement, {
            elementId: element.id
        })
        startPos = {x: e.pageX, y: e.pageY}
        document.addEventListener('mousemove',onMouseMove)
        document.addEventListener('mouseup', onMouseUp)

    }

    const onMouseMove = (e: MouseEvent) => {
        const delta = {x: e.pageX - startPos.x, y: e.pageY - startPos.y}
        const newPos = {x: position.x + delta.x, y: position.y + delta.y}
        setPosition(newPos)
        setDndPosition(newPos)
    }

    const onMouseUp = () => {
        // setPosition(dndPosition)
if (dndPosition) {
    dispatch(changePosition, dndPosition)
    setPosition(dndPosition)
    setDndPosition(null)
}

        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)

    }

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