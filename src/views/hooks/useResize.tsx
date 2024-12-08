import React, {useEffect, useState} from "react";
import {ImageElement, Position, TextElement} from "../../store/types.ts";
import {useAppActions} from "./useAppAction.ts";

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

    const {changeElementPosition, changeElementSize} = useAppActions()

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
                if (newWidth < 20) {
                    return
                }
                setDndRect(prevState => ({
                    ...prevState,
                    width: newWidth
                }))
            }

            if (direction == "bottom") {
                const newHeight = dndRect.height + delta.y
                if (newHeight < 20) {
                    return
                }
                setDndRect(prevState => ({
                    ...prevState,
                    height: newHeight
                }))
            }

            if (direction == "rightBottom") {
                const ratio = dndRect.width / (dndRect.width + delta.x)
                const newWidth = dndRect.width + delta.x
                const newHeight = dndRect.height / ratio
                if (newWidth < 20 || newHeight < 20) {
                    return
                }
                setDndRect(prevState => ({
                    ...prevState,
                    width: newWidth,
                    height: newHeight
                }))
            }

            if (direction == "top") {
                const newTop = dndRect.top + delta.y
                const newHeight = dndRect.height - delta.y
                if (newHeight < 20) {
                    return
                }
                setDndRect(prevState => ({
                    ...prevState,
                    top: newTop,
                    height: newHeight
                }))
            }

            if (direction == "left") {
                const newLeft = dndRect.left + delta.x
                const newWidth = dndRect.width - delta.x
                if (newWidth < 20) return
                setDndRect(prevState => ({
                    ...prevState,
                    left: newLeft,
                    width: newWidth,
                }))
            }

            if (direction == "leftBottom") {
                const ratio = dndRect.width / (dndRect.width - delta.x)
                const newLeft = dndRect.left + delta.x
                const newWidth = dndRect.width - delta.x
                const newHeight = dndRect.height / ratio
                if (newWidth < 20 || newHeight < 20) {
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
                let newTop = dndRect.top + delta.y
                let newLeft = dndRect.left + delta.x
                let newWidth = dndRect.width - delta.x
                let newHeight = dndRect.height - delta.y
                if (newWidth < 20) {
                    newWidth = dndRect.width
                    newLeft = dndRect.left
                }
                if(newHeight < 20) {
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
                let newTop = dndRect.top + delta.y
                let newHeight = dndRect.height - delta.y
                let newWidth = dndRect.width + delta.x
                if (newWidth < 20) {
                    newWidth = dndRect.width
                }
                if(newHeight < 20) {
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

            // if (dndRect.width < 15) {
            //     setDndRect(prevState => ({
            //         ...prevState,
            //         width: 15
            //     }))
            // }
            //
            // if (dndRect.height < 15) {
            //     setDndRect(prevState => ({
            //         ...prevState,
            //         height: 15
            //     }))
            // }

            setStartPos({x: e.pageX, y: e.pageY})
        }

        const onMouseUp = () => {
            if (!isDragging || !dndRect || !dndRect.width || !dndRect.height || !dndRect.top || !dndRect.left) {
                return
            }


            changeElementSize({
                width: dndRect.width,
                height: dndRect.height
            })

            changeElementPosition({
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

    }, [changeElementPosition, changeElementSize, direction, dndRect, isDragging, startPos]);

    return {onResize, dndRect}
}

