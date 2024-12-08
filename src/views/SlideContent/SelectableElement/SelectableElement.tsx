import classes from './SelectableElement.module.css'
import {ImageElement, TextElement} from "../../../store/types.ts";
import TextComponent from "../TextComponent/TextComponent.tsx";
import ImageComponent from "../ImageComponent/ImageComponent.tsx";
import {CSSProperties, RefObject, useRef} from "react";
import {useDragAndDropElement} from "../../hooks/useDragAndDropElement.tsx";
import {useResize} from "../../hooks/useResize.tsx";

type SelectableElementProps = {
    element: TextElement | ImageElement,
    selectedElementId?: string | null,
    scale: number,
    elementStyle?: string,
    id: string,
}

export function SelectableElement({
                                      element,
                                      scale = 1,
                                      elementStyle,
                                      selectedElementId,
                                      id
                                  }: SelectableElementProps) {


    const {onResize, dndRect: dndRect} = useResize()

    const elementRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
    const elementPosition = useDragAndDropElement(elementRef, element)

    const borderStyle: CSSProperties = {
        top: `${scale * element.position.y}px`,
        left: `${scale * element.position.x}px`,
        width: `${scale * element.size.width}px`,
        height: `${scale * element.size.height}px`,
    }

    let resizeWidth = element.size.width
    let resizeHeight = element.size.height
    let resizeTop = elementPosition.y
    let resizeLeft = elementPosition.x

    if (dndRect && dndRect.top != undefined && dndRect.left != undefined && dndRect.height != undefined && dndRect.width != undefined) {
        resizeWidth = dndRect.width
        resizeHeight = dndRect.height
        resizeTop = dndRect.top
        resizeLeft = dndRect.left
    }

    const resizeMaskStyle: CSSProperties = {
        top: `${scale * resizeTop}px`,
        left: `${scale * resizeLeft}px`,
        width: `${scale * resizeWidth - 1}px`,
        height: `${scale * resizeHeight - 1}px`,
    }

    // if (dndRect != null) {
    //     // resizeMaskStyle.zIndex = 2
    // }

    if (element.id == selectedElementId) {
        resizeMaskStyle.zIndex = 1
        // borderStyle.zIndex = 1
        // borderStyle.border = '2px solid #4285f4'
        resizeMaskStyle.border = '1px solid #5f6368'
        resizeMaskStyle.backgroundColor = 'rgba(0, 0, 0, 0.1)'
    }

    return (
        <div>

            <div ref={elementRef}
                 data-element-id={id}
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
                    />}
            </div>
            <div style={resizeMaskStyle}
                 className={classes.resizeableElement}>
                {element.id == selectedElementId && (
                    <>
                        <div onMouseDown={(e) => onResize(e, element, "left")}
                             data-resizer-id={'L'}
                             className={classes.resizerL}></div>
                        <div onMouseDown={(e) => onResize(e, element, "top")}
                             data-resizer-id={'T'}
                             className={classes.resizerT}></div>
                        <div onMouseDown={(e) => onResize(e, element, "right")}
                             data-resizer-id={'R'}
                             className={classes.resizerR}></div>
                        <div onMouseDown={(e) => onResize(e, element, "bottom")}
                             data-resizer-id={'B'}
                             className={classes.resizerB}></div>
                        <div onMouseDown={(e) => onResize(e, element, "rightBottom")}
                             data-resizer-id={'RB'}
                             className={classes.resizerRB}></div>
                        <div onMouseDown={(e) => onResize(e, element, "leftBottom")}
                             data-resizer-id={'LB'}
                             className={classes.resizerLB}></div>
                        <div onMouseDown={(e) => onResize(e, element, "leftTop")}
                             data-resizer-id={'LT'}
                             className={classes.resizerLT}></div>
                        <div onMouseDown={(e) => onResize(e, element, "rightTop")}
                             data-resizer-id={'RT'}
                             className={classes.resizerRT}></div>
                    </>)}
            </div>
        </div>
    )
}