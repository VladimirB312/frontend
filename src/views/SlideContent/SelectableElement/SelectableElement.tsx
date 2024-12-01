import classes from './SelectableElement.module.css'
import {ImageElement, TextElement} from "../../../store/objects.ts";
import TextComponent from "../TextComponent/TextComponent.tsx";
import ImageComponent from "../ImageComponent/ImageComponent.tsx";
import {CSSProperties, RefObject, useRef} from "react";
import {useDragAndDrop} from "../../../hooks/useDragAndDropElement.tsx";
import {useResize} from "../../../hooks/useResize.tsx";

type SelectableElementProps = {
    element: TextElement | ImageElement,
    selectedElementId?: string | null,
    scale: number,
    elementStyle?: string,
}

// function getSlideId(node: Element): string | null {
//     const element: Element | null = node;
//
//     // while (element != null) {
//     if (element.getAttribute('data-slide-id')) {
//         return element.getAttribute('data-slide-id');
//     }
//     // element = element.parentNode as Element;
//     // }
//     return null;
// }

export function SelectableElement({
                                      element,
                                      scale = 1,
                                      elementStyle,
                                      selectedElementId
                                  }: SelectableElementProps) {


    const {onResize, dndRect: dndRect} = useResize()

    const elementRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
    const elementPosition = useDragAndDrop(elementRef, element)

    // const borderStyle: CSSProperties = {
    //     top: `${scale * elementPosition.y}px`,
    //     left: `${scale * elementPosition.x}px`,
    //     width: `${scale * element.size.width}px`,
    //     height: `${scale * element.size.height}px`,
    // }

    const borderStyle: CSSProperties = {
        top: `${scale * element.position.y}px`,
        left: `${scale * element.position.x}px`,
        width: `${scale * element.size.width}px`,
        height: `${scale * element.size.height}px`,
    }

    // let resizeWidth = element.size.width
    // let resizeHeight = element.size.height
    // let resizeTop = element.position.y
    // let resizeLeft = element.position.x

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
        top: `${scale * resizeTop + 1}px`,
        left: `${scale * resizeLeft + 1}px`,
        width: `${scale * resizeWidth}px`,
        height: `${scale * resizeHeight}px`,
    }

    if (dndRect != null) {
        resizeMaskStyle.zIndex = 2
    }

    if (element.id == selectedElementId) {
        borderStyle.zIndex = 1
        borderStyle.border = '2px solid #4285f4'
        resizeMaskStyle.border = '1px solid #5f6368'
        resizeMaskStyle.backgroundColor = 'rgba(0, 0, 0, 0.1)'
    }

    return (
        <div>
            <div style={resizeMaskStyle}
                 className={classes.resizeableElement}>

                {element.id == selectedElementId && (
                    <>
                        <div onMouseDown={(e) => onResize(e, element, "left")}
                             className={classes.resizerL}></div>
                        <div onMouseDown={(e) => onResize(e, element, "top")}
                             className={classes.resizerT}></div>
                        <div onMouseDown={(e) => onResize(e, element, "right")}
                             className={classes.resizerR}></div>
                        <div onMouseDown={(e) => onResize(e, element, "bottom")}
                             className={classes.resizerB}></div>
                        <div onMouseDown={(e) => onResize(e, element, "rightBottom")}
                             className={classes.resizerRB}></div>
                        <div onMouseDown={(e) => onResize(e, element, "leftBottom")}
                             className={classes.resizerLB}></div>
                        <div onMouseDown={(e) => onResize(e, element, "leftTop")}
                             className={classes.resizerLT}></div>
                        <div onMouseDown={(e) => onResize(e, element, "rightTop")}
                             className={classes.resizerRT}></div>
                    </>)}
            </div>

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
                    />}

            </div>


        </div>
    )
}