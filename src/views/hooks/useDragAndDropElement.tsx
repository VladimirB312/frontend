import React, {useEffect, useRef, useState} from "react";
import {ImageElement, Position, TextElement} from "../../store/types.ts";
import {useAppActions} from "./useAppAction.ts";

function useDragAndDropElement(elementRef: React.RefObject<HTMLDivElement>, element: TextElement | ImageElement, scale: number): Position {
    const [dndPosition, setDndPosition] = useState<Position | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startPos, setStartPos] = useState<Position | null>(null)
    const [isTextEditing, setIsTextEditing] = useState(false)
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

    const {setSelectionElement, resetSelectionElement, changeElementPosition} = useAppActions()

    const clearTextArea = () => {
        setIsTextEditing(false)
        if (textAreaRef.current) {
            textAreaRef.current.style.cursor = ''
            textAreaRef.current.setSelectionRange(textAreaRef.current.selectionStart, textAreaRef.current.selectionStart);
            textAreaRef.current.readOnly = true;
            textAreaRef.current = null
        }
    }

    useEffect(() => {
        const onDoubleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const textAreaElement = target.closest('textarea')

            if (elementRef.current && elementRef.current.contains(e.target as Node) && textAreaElement) {
                setIsTextEditing(true)
                textAreaRef.current = textAreaElement
                textAreaRef.current.readOnly = false;
                textAreaRef.current.style.cursor = 'text'
            }
        }

        const onMouseDown = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const elementId = target.closest('[data-element-id]');
            const resizerId = target.closest('[data-resizer-id]')
            const slideContentId = target.closest('[data-slide-content-id]')
            const selectedTextArea = target.closest('textarea')

            if (textAreaRef.current != selectedTextArea) {
                clearTextArea()
            }

            if (!isTextEditing && elementRef.current && elementRef.current.contains(e.target as Node)) {
                setIsDragging(true)
                setDndPosition(element.position)
                setStartPos({x: e.pageX, y: e.pageY})

                setSelectionElement(element.id)
            } else if (!elementId && !resizerId && slideContentId) {
                clearTextArea()
                resetSelectionElement()
            }
        }

        const onMouseMove = (e: MouseEvent) => {
            e.preventDefault()

            if (isTextEditing || !isDragging || !elementRef.current?.offsetParent || !startPos || !dndPosition || !scale) {
                return;
            }

            elementRef.current.style.userSelect = 'none'
            elementRef.current.style.pointerEvents = 'none'

            const delta = {x: e.pageX - startPos.x, y: e.pageY - startPos.y}
            const newPosition = {x: dndPosition.x + delta.x / scale , y: dndPosition.y + delta.y / scale }

            setDndPosition(newPosition)
            setStartPos({x: e.pageX, y: e.pageY})
        }

        const onMouseUp = () => {

            if (isTextEditing || !isDragging || !dndPosition || !elementRef.current) {
                return
            }

            elementRef.current.style.userSelect = ''
            elementRef.current.style.pointerEvents = ''

            changeElementPosition(dndPosition);
            setIsDragging(false)
            setStartPos(null)
            setDndPosition(null)

            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('dblclick', onDoubleClick)
        }

        document.addEventListener('mousedown', onMouseDown)
        document.addEventListener('dblclick', onDoubleClick)
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)

        return () => {
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('dblclick', onDoubleClick)
        }

    }, [dndPosition, isDragging, startPos, elementRef, element.position, element.id, isTextEditing, textAreaRef]);

    return dndPosition ?? element.position;
}

export {useDragAndDropElement}

