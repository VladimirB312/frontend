import React, {useEffect, useState} from "react";
import {dispatch} from "../../store/editor.ts";
import {setActiveSlide, setSelectionElement, setSelectionSlide} from "../../store/setActiveSlide.ts";
import {changePosition} from "../../store/changePosition.ts";
import {ImageElement, Position, TextElement} from "../../store/objects.ts";

export function useDNDSlides(elementRef: React.RefObject<HTMLDivElement>, event, slideId: string) {
    const [dndPosition, setDndPosition] = useState<Position | null>(null)

    useEffect(() => {
        elementRef.current?.addEventListener('mousedown', onMouseDown)

        return () => {
            elementRef.current?.removeEventListener('mousedown', onMouseDown)
        }

    }, [dndPosition]);

    if (event.ctrlKey) {
        dispatch(setSelectionSlide, {
            slideId: slideId,
        })
    } else {
        dispatch(setActiveSlide, {
            slideId: slideId,
        })
    }

    let startPos: Position = {x: 0, y: 0}
    let currentDndPosition: Position | null = null;

    const onMouseDown = (e: MouseEvent) => {
        dispatch(setSelectionElement, {
            elementId: element.id
        })
        startPos = {x: e.pageX, y: e.pageY}
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    const onMouseMove = (e: MouseEvent) => {
        const delta = {x: e.pageX - startPos.x, y: e.pageY - startPos.y}
        currentDndPosition = {x: element.position.x + delta.x, y: element.position.y + delta.y};
        setDndPosition(currentDndPosition);
    }

    const onMouseUp = () => {
        console.log(currentDndPosition);

        if (currentDndPosition) {
            dispatch(changePosition, currentDndPosition);
            setDndPosition(null);
        }

        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
    }
}

