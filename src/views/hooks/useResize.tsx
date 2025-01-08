import React, {useEffect, useState} from "react";
import {ImageElement, Position, TextElement} from "../../store/types.ts";
import {useAppActions} from "./useAppAction.ts";

const MIN_ELEMENT_SIZE = 15;

type Direction = null | "right" | "left" | "top" | "bottom" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom"

type Rect = {
    left?: number,
    top?: number,
    width?: number,
    height?: number,
}

const useResize = () => {
    const [dndRect, setDndRect] = useState<Rect | null>(null)
    const [startRect, setStartRect] = useState<Rect | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startPos, setStartPos] = useState<Position | null>(null)
    const [direction, setDirection] = useState<Direction>(null)
    const [scale, setScale] = useState<null | number>(null)

    const {changeElementPosition, changeElementSize, changeElementRect} = useAppActions()

    const onResize = (e: React.MouseEvent<HTMLDivElement>, element: TextElement | ImageElement, dir: Direction, scale: number) => {
        if (!element) {
            return
        }
        e.preventDefault()
        setScale(scale)
        setDirection(dir)
        setIsDragging(true)
        setStartPos({x: e.pageX, y: e.pageY})
        setDndRect({
            left: element.position.x,
            top: element.position.y,
            width: element.size.width,
            height: element.size.height
        })
        setStartRect({
            left: element.position.x,
            top: element.position.y,
            width: element.size.width,
            height: element.size.height
        })
    }

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging || !startPos || !dndRect || !direction || !scale || !startRect) {
                return
            }

            if (dndRect.top == undefined || dndRect.left == undefined || dndRect.height == undefined || dndRect.width == undefined) {
                return
            }

            if (startRect.top == undefined || startRect.left == undefined || startRect.height == undefined || startRect.width == undefined) {
                return
            }

            e.preventDefault()

            const delta = {x: Math.round(e.pageX - startPos.x) / scale, y: Math.round(e.pageY - startPos.y) / scale}

            if (direction == "right") {
                const newWidth = startRect.width + delta.x
                if (newWidth < MIN_ELEMENT_SIZE) {
                    return
                }
                setDndRect(prevState => ({
                    ...prevState,
                    width: newWidth
                }))
            }

            if (direction == "bottom") {
                const newHeight = startRect.height + delta.y
                if (newHeight < MIN_ELEMENT_SIZE) {
                    return
                }
                setDndRect(prevState => ({
                    ...prevState,
                    height: newHeight
                }))
            }

            if (direction == "rightBottom") {
                const ratio = startRect.width / startRect.height
                const newWidth = startRect.width + delta.x
                const newHeight = startRect.height + delta.x / ratio

                if (newWidth < MIN_ELEMENT_SIZE || newHeight < MIN_ELEMENT_SIZE) {
                    return
                }
                setDndRect(prevState => ({
                    ...prevState,
                    width: newWidth,
                    height: newHeight
                }))
            }

            if (direction == "top") {
                const newTop = startRect.top + delta.y
                const newHeight = startRect.height - delta.y
                if (newHeight < MIN_ELEMENT_SIZE) {
                    return
                }
                setDndRect(prevState => ({
                    ...prevState,
                    top: newTop,
                    height: newHeight
                }))
            }

            if (direction == "left") {
                const newLeft = startRect.left + delta.x
                const newWidth = startRect.width - delta.x
                if (newWidth < MIN_ELEMENT_SIZE) return
                setDndRect(prevState => ({
                    ...prevState,
                    left: newLeft,
                    width: newWidth,
                }))
            }

            if (direction == "leftBottom") {
                const ratio = startRect.width / startRect.height
                const newWidth= startRect.width - delta.x
                const newHeight= startRect.height - delta.x / ratio
                const newLeft= startRect.left + delta.x

                if (newWidth < MIN_ELEMENT_SIZE || newHeight < MIN_ELEMENT_SIZE) {
                    return
                }
                setDndRect(prevState => ({
                    ...prevState,
                    left: newLeft,
                    width: newWidth,
                    height: newHeight,
                }))
            }

            if (direction == "leftTop") {
                const ratio = startRect.width / startRect.height
                let newWidth = startRect.width - delta.x
                let newHeight = startRect.height - delta.x / ratio
                const deltaHeight = startRect.height - newHeight
                let newTop = startRect.top + deltaHeight
                let newLeft = startRect.left + delta.x

                if (newWidth < MIN_ELEMENT_SIZE) {
                    newWidth = dndRect.width
                    newLeft = dndRect.left
                }
                if (newHeight < MIN_ELEMENT_SIZE) {
                    newTop = dndRect.top
                    newHeight = dndRect.height
                }
                setDndRect({
                    top: newTop,
                    left: newLeft,
                    width: newWidth,
                    height: newHeight,
                })
            }

            if (direction == "rightTop") {
                const ratio = startRect.width / startRect.height
                let newHeight = startRect.height + delta.x / ratio
                let newWidth = startRect.width + delta.x
                const deltaHeight = startRect.height - newHeight
                let newTop = startRect.top + deltaHeight

                if (newWidth < MIN_ELEMENT_SIZE) {
                    newWidth = dndRect.width
                }
                if (newHeight < MIN_ELEMENT_SIZE) {
                    newTop = dndRect.top
                    newHeight = dndRect.height
                }
                setDndRect(prevState => ({
                    ...prevState,
                    top: newTop,
                    width: newWidth,
                    height: newHeight,
                }))
            }
        }

        const onMouseUp = () => {
            if (!isDragging || !dndRect || dndRect.left == null || dndRect.top == null || dndRect.width == null || dndRect.height == null) {
                return
            }

            changeElementRect({
                position: {
                    x: dndRect.left,
                    y: dndRect.top
                },
                size: {
                    width: dndRect.width,
                    height: dndRect.height
                }
            })

            setStartPos(null)
            setIsDragging(false)
            setDndRect(null)
            setDirection(null)

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }


        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

    }, [changeElementPosition, changeElementRect, changeElementSize, direction, dndRect, isDragging, startPos]);

    return {onResize, dndRect}
}

export {useResize}
export type {Direction}
