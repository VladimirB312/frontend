import React, {useEffect, useState} from "react";
import {dispatch} from "../store/editor.ts";
import {changePosition, changeSize} from "../store/changePosition.ts";
import {ImageElement, Position, TextElement} from "../store/objects.ts";

type Direction = null | "right" | "left" | "top" | "bottom" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom"

type Rect = {
    left?: number,
    top?: number,
    width?: number,
    height?: number,
}

export function useResize() {
    const [dndRect, setDndRect] = useState<Rect | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startPos, setStartPos] = useState<Position | null>(null)
    const [direction, setDirection] = useState<Direction>(null)

    const onResize = (e: React.MouseEvent<HTMLDivElement>, element: TextElement | ImageElement, dir: Direction,) => {
        if (!element) {
            return
        }
        setDirection(dir)
        setIsDragging(true)
        setStartPos({x: e.pageX, y: e.pageY})
        setDndRect({
            left: element.position.x,
            top: element.position.y,
            width: element.size.width,
            height: element.size.height
        })
    }

    useEffect(() => {
        if (!isDragging) {
            return
        }

        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging || !startPos || !dndRect || !direction) {
                return
            }

            if (dndRect.top == undefined || dndRect.left == undefined || dndRect.height == undefined || dndRect.width == undefined) {
                return
            }

            e.preventDefault()

            const delta = {x: e.pageX - startPos.x, y: e.pageY - startPos.y}

            if (direction == "right") {
                const newWidth = dndRect.width + delta.x
                setDndRect(prevState => ({
                    ...prevState,
                    width: newWidth
                }))
            }

            if (direction == "bottom") {
                const newHeight = dndRect.height + delta.y
                setDndRect(prevState => ({
                    ...prevState,
                    height: newHeight
                }))
            }

            if (direction == "rightBottom") {
                const newWidth = dndRect.width + delta.x
                const newHeight = dndRect.height + delta.y
                setDndRect(prevState => ({
                    ...prevState,
                    width: newWidth,
                    height: newHeight
                }))
            }

            if (direction == "top") {
                const newTop = dndRect.top + delta.y
                const newHeight = dndRect.height - delta.y
                setDndRect(prevState => ({
                    ...prevState,
                    top: newTop,
                    height: newHeight
                }))
            }

            if (direction == "left") {
                const newLeft = dndRect.left + delta.x
                const newWidth = dndRect.width - delta.x
                setDndRect(prevState => ({
                    ...prevState,
                    left: newLeft,
                    width: newWidth,
                }))
            }

            if (direction == "leftBottom") {
                const newLeft = dndRect.left + delta.x
                const newWidth = dndRect.width - delta.x
                const newHeight = dndRect.height + delta.y
                setDndRect(prevState => ({
                    ...prevState,
                    left: newLeft,
                    width: newWidth,
                    height: newHeight,
                }))
            }

            if (direction == "leftTop") {
                const newTop = dndRect.top + delta.y
                const newLeft = dndRect.left + delta.x
                const newWidth = dndRect.width - delta.x
                const newHeight = dndRect.height - delta.y
                setDndRect({
                    top: newTop,
                    left: newLeft,
                    width: newWidth,
                    height: newHeight,
                })
            }

            if (direction == "rightTop") {
                const newTop = dndRect.top + delta.y
                const newHeight = dndRect.height - delta.y
                const newWidth = dndRect.width + delta.x
                setDndRect(prevState => ({
                    ...prevState,
                    top: newTop,
                    width: newWidth,
                    height: newHeight,
                }))
            }

            setStartPos({x: e.pageX, y: e.pageY})
        }

        const onMouseUp = () => {
            if (!isDragging || !dndRect) {
                return
            }


            dispatch(changeSize, {
                width: dndRect.width,
                height: dndRect.height
            });
            dispatch(changePosition, {
                x: dndRect.left,
                y: dndRect.top
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

    }, [direction, dndRect, isDragging, startPos]);

    return {onResize, dndRect}
}

