import {RefObject, useEffect, useState} from "react";
import {Position, SelectionType} from "../../store/types.ts";
import {useAppActions} from "./useAppAction.ts";

function getSlideId(node: Element): string | null {
    const element: Element | null = node;

    // while (element != null) {
    if (element.getAttribute('data-slide-id')) {
        return element.getAttribute('data-slide-id');
    }
    // element = element.parentNode as Element;
    // }
    return null;
}

function useSlideListDnd(slideListRef: RefObject<HTMLDivElement>, selection: SelectionType | null): {
    isDragging: boolean,
    dndPosition: Position | null
} {
    const [dndPosition, setDndPosition] = useState<Position | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startPosition, setStartPosition] = useState<Position | null>(null)
    const [slideRect, setSlideRect] = useState<Position | null>(null)
    const [draggedSlideId, setDraggedSlideId] = useState<null | string>(null)

    const {setSelectionSlide, setActiveSlide, changeSlidePosition} = useAppActions()

    const handleClick = (event: MouseEvent, slideId: string) => {
        if (event.ctrlKey) {
            setSelectionSlide(slideId)
            return;
        }

        setActiveSlide(slideId)
    }

    useEffect(() => {
        const onMouseDown = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            const slideId = getSlideId(event.target as Element)
            setIsDragging(false)
            if (slideId) {
                setDraggedSlideId(slideId)
                setStartPosition({x: event.pageX, y: event.pageY})
                setSlideRect({x: target.getBoundingClientRect().x, y: target.getBoundingClientRect().y})
            }
        }

        const onMouseMove = (event: MouseEvent) => {
            event.preventDefault()

            if (!draggedSlideId || !startPosition || !slideRect) {
                return
            }

            if (!selection?.selectedSlidesId?.includes(draggedSlideId)) {
                setActiveSlide(draggedSlideId)
            }

            setIsDragging(true)

            if (slideListRef.current && event.pageY < slideListRef.current.getBoundingClientRect().y + 50) {
                slideListRef.current.scrollTop = slideListRef.current.scrollTop - 10
            }

            if (slideListRef.current && event.pageY > slideListRef.current.clientHeight + slideListRef.current.getBoundingClientRect().y - 50) {
                slideListRef.current.scrollTop = slideListRef.current.scrollTop + 10
            }

            const delta = {x: event.pageX - startPosition.x, y: event.pageY - startPosition.y}
            const newPosition = {x: Math.round(slideRect.x + delta.x), y: Math.round(delta.y + slideRect.y)}
            setDndPosition(newPosition)

        }

        const onMouseUp = (event: MouseEvent) => {
            if (!draggedSlideId) {
                setIsDragging(false)
                setDndPosition(null)
                setStartPosition(null)
                setSlideRect(null)
                return
            }

            const targetSlide = getSlideId(event.target as Element)

            if (!isDragging && targetSlide) {
                handleClick(event, targetSlide)
            } else if (targetSlide && draggedSlideId != targetSlide) {
                changeSlidePosition(targetSlide)
            }

            setDraggedSlideId(null)
            setIsDragging(false)
            setDndPosition(null)
            setStartPosition(null)
            setSlideRect(null)

            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousedown', onMouseDown)
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)

        return () => {
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

    }, [dndPosition, isDragging, startPosition, draggedSlideId, selection?.selectedSlidesId, slideListRef])

    return {isDragging, dndPosition}
}

export {useSlideListDnd}