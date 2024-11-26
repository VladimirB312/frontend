import React, {useEffect, useState} from "react";
import {dispatch} from "../store/editor.ts";
import { changeSize} from "../store/changePosition.ts";
import {ImageElement, Size, TextElement} from "../store/objects.ts";

export function useDragAndDropResize(dotRef: React.RefObject<HTMLDivElement>, element: TextElement | ImageElement): number {
    const [dndSize, setDndSize] = useState<Size | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startPos, setStartPos] = useState(element.position)

    let currentDndWidth = dndSize?.width || element.size.width


    useEffect(() => {

        const onMouseDown = (e: MouseEvent) => {
            if (dotRef.current && dotRef.current.contains(e.target as Node)) {
                e.stopPropagation()
                e.preventDefault()
                setStartPos({x: e.pageX, y: e.pageY})
                setDndSize(element.size)
            }
        }

        const onMouseMove = (e: MouseEvent) => {
            e.preventDefault()
            setIsDragging(true)
            if (!dndSize || !dotRef.current?.offsetParent) {
                return;
            }

            const delta = {x: e.pageX - startPos.x, y: e.pageY - startPos.y}
            const newWidth = element.size.width + delta.x

            currentDndWidth = newWidth;
            setDndSize({width: newWidth, height: dndSize.height })

        }

        const onMouseUp = () => {
            if (isDragging && currentDndWidth && dndSize) {
                setIsDragging(false)

                dispatch(changeSize, dndSize);
                // setStartPos(currentDndWidth)
                setDndSize(null)
            }
        }

        document.addEventListener('mousedown', onMouseDown)
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)

        return () => {
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

    }, [dndSize, isDragging, startPos, currentDndWidth]);

    return currentDndWidth;
}

