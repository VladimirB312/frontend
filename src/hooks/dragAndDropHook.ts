import {RefObject, useCallback, useEffect, useState} from "react";
import {dispatch} from "../store/editor.ts";
import {changePosition} from "../store/changePosition.ts";
import {Position, SlideElement} from "../store/objects.ts";

export function useDragAndDropHook(elementRef: RefObject<HTMLDivElement>, element: SlideElement): Position {
    const [dndPosition, setDndPosition] = useState<Position | null>(null)
    const [startPos, setStartPos] = useState<Position>({x: 0, y: 0})


    const onMouseMove = useCallback((e: MouseEvent) => {
        const delta = {x: e.pageX - startPos.x, y: e.pageY - startPos.y}
        const newPos = {x: element.position.x + delta.x, y: element.position.y + delta.y}

        setDndPosition(newPos)

    }, [dndPosition, element.position.x, element.position.y, startPos.x, startPos.y])

    const onMouseUp = useCallback(() => {
        if (dndPosition) {
            dispatch(changePosition, dndPosition)
            setDndPosition(null)
        }
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
    }, [dndPosition, onMouseMove])

    const onMouseDown = useCallback((e: MouseEvent) => {
        // dispatch(setSelectionElement, {
        //     elementId: element.id
        // })
        setStartPos({x: e.pageX, y: e.pageY})

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }, [onMouseMove, onMouseUp])

    useEffect(() => {
        console.log('asdfasdf')
        elementRef.current?.addEventListener('mousedown', onMouseDown)

        return () => {
            console.log('!!!!!!!!!!!!')
            if (elementRef.current) {
                elementRef.current.removeEventListener('mousedown', onMouseDown)
                document.removeEventListener('mousemove', onMouseMove)
                document.removeEventListener('mouseup', onMouseUp)
            }
        }

    }, []);

    return dndPosition ?? element.position
}

