import classes from "./GhostElement.module.css";
import {ImageElement, TextElement} from "../../../store/types.ts";
import {useResize} from "../../hooks/useResize.tsx";
import React, {CSSProperties, SetStateAction} from "react";
import {useDragAndDropElement} from "../../hooks/useDragAndDropElement.tsx";
import {Resizers} from "./Resizers.tsx";

type GhostElementProps = {
    element: TextElement | ImageElement,
    elementRef: React.RefObject<HTMLDivElement>,
    selectedElementId?: string | null,
    scale: number,
    setTextEditMode?: React.Dispatch<SetStateAction<boolean>>,
}

const GhostElement = ({
                          element,
                          scale = 1,
                          selectedElementId,
                          elementRef,
                          setTextEditMode,
                      }: GhostElementProps) => {

    const {onResize, dndRect: dndRect} = useResize()
    const elementPosition = useDragAndDropElement(elementRef, element, scale, setTextEditMode)

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

    if (element.id == selectedElementId) {
        resizeMaskStyle.zIndex = 1
        resizeMaskStyle.border = '1px solid #5f6368'
        resizeMaskStyle.backgroundColor = 'rgba(0, 0, 0, 0.09)'
    }

    return (
        <div style={resizeMaskStyle}
             className={classes.resizeableElement}>
            {element.id == selectedElementId && (
                <Resizers element={element} scale={scale} onResize={onResize}/>
            )}
        </div>
    )
}

export {GhostElement}