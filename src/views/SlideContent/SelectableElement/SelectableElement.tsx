import classes from './SelectableElement.module.css'
import {ImageElement, TextElement} from "../../../store/objects.ts";
import TextComponent from "../TextComponent/TextComponent.tsx";
import ImageComponent from "../ImageComponent/ImageComponent.tsx";
import {CSSProperties, useRef} from "react";
import {dispatch} from "../../../store/editor.ts";
import {setSelectionElement} from "../../../store/setActiveSlide.ts";
import {useDragAndDropHook} from "../../../hooks/dragAndDropHook.ts";

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

    const position = useDragAndDropHook(elementRef, element)
    // const position = element.position

    console.warn('SelectableElement', position)

    const borderStyle: CSSProperties = {
        top: `${scale * position.y}px`,
        left: `${scale * position.x}px`,
        width: `${scale * element.size.width}px`,
        height: `${scale * element.size.height}px`,
    }

    // if (element.id == selectedElementId) {
    //     borderStyle.border = '2px solid #5F5F7CFF'
    //     borderStyle.backgroundColor = 'rgba(0, 0, 0, 0.1)'
    // } else {
    //     borderStyle.border = 'none'
    // }

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