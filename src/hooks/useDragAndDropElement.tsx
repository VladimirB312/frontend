import React, {useEffect, useState} from "react";
import {dispatch} from "../store/editor.ts";
import {changePosition} from "../store/changePosition.ts";
import {ImageElement, Position, TextElement} from "../store/objects.ts";
import {setSelectionElement} from "../store/setActiveSlide.ts";

export function useDragAndDrop(elementRef: React.RefObject<HTMLDivElement>, element: TextElement | ImageElement): Position {
    const [dndPosition, setDndPosition] = useState<Position | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startPos, setStartPos] = useState(element.position)

    let currentDndPosition = dndPosition || element.position


    useEffect(() => {
        const onMouseDown = (e: MouseEvent) => {
            // e.preventDefault()

            if (elementRef.current && elementRef.current.contains(e.target as Node)) {
                setIsDragging(true)
                setDndPosition(startPos)
                setStartPos({x: e.pageX, y: e.pageY})

                dispatch(setSelectionElement, {
                    elementId: element.id
                })
            }
        }

        const onMouseMove = (e: MouseEvent) => {
            e.preventDefault()

            if (!isDragging || !elementRef.current?.offsetParent) {
                return;
            }

            // const width = elementRef.current.offsetParent.getBoundingClientRect().width
            // const height = elementRef.current.offsetParent.getBoundingClientRect().height

            const delta = {x: e.pageX - startPos.x, y: e.pageY - startPos.y}
            const newPosition = {x: element.position.x + delta.x, y: element.position.y + delta.y}

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


            currentDndPosition = newPosition;
            setDndPosition(currentDndPosition)

        }

        const onMouseUp = () => {
            if (isDragging && currentDndPosition) {
                setIsDragging(false)

                dispatch(changePosition, currentDndPosition);
                setStartPos(currentDndPosition)
                setDndPosition(null)
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

    }, [dndPosition, isDragging, startPos, currentDndPosition]);

    return currentDndPosition;
}

