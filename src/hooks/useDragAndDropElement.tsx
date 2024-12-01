import React, {useEffect, useState} from "react";
import {dispatch} from "../store/editor.ts";
import {changePosition} from "../store/changePosition.ts";
import {ImageElement, Position, TextElement} from "../store/objects.ts";
import {setSelectionElement} from "../store/setActiveSlide.ts";

export function useDragAndDrop(elementRef: React.RefObject<HTMLDivElement>, element: TextElement | ImageElement): Position {
    const [dndPosition, setDndPosition] = useState<Position | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startPos, setStartPos] = useState<Position | null>(null)

    useEffect(() => {
        const onMouseDown = (e: MouseEvent) => {
            // e.preventDefault()

            if (elementRef.current && elementRef.current.contains(e.target as Node)) {
                elementRef.current.style.userSelect = `none`

                setIsDragging(true)
                setDndPosition(element.position)
                setStartPos({x: e.pageX, y: e.pageY})

                dispatch(setSelectionElement, {
                    elementId: element.id
                })
            }
        }

        const onMouseMove = (e: MouseEvent) => {
            e.preventDefault()

            if (!isDragging || !elementRef.current?.offsetParent || !startPos || !dndPosition) {
                return;
            }

            // const width = elementRef.current.offsetParent.getBoundingClientRect().width
            // const height = elementRef.current.offsetParent.getBoundingClientRect().height

            const delta = {x: e.pageX - startPos.x, y: e.pageY - startPos.y}
            const newPosition = {x: dndPosition.x + delta.x, y: dndPosition.y + delta.y}

            // if (newPosition.x < 0) {
            //     newPosition.x = 0;
            // }
            // if (newPosition.x + element.size.width > width) {
            //     newPosition.x = width - element.size.width
            // }
            // if (newPosition.y < 0) {
            //     newPosition.y = 0
            // }
            // if (newPosition.y + element.size.height > height) {
            //     newPosition.y = height - element.size.height
            // }


            setDndPosition(newPosition)
            setStartPos({x: e.pageX, y: e.pageY})

        }

        const onMouseUp = () => {

            if (!isDragging || !dndPosition) {
                return
            }

            dispatch(changePosition, dndPosition);
            setIsDragging(false)
            setStartPos(null)
            setDndPosition(null)
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        if (!elementRef.current) {
            return;
        }
        const tempElementRef = elementRef
        elementRef.current.addEventListener('mousedown', onMouseDown)
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)

        return () => {
            tempElementRef?.current?.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

    }, [dndPosition, isDragging, startPos, elementRef, element.position, element.id]);

    return dndPosition ?? element.position;
}

