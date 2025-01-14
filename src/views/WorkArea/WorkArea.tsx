import {SlideType} from "../../store/types.ts";
import classes from './WorkArea.module.css'
import {SlideContent} from "../SlideContent/SlideContent.tsx";
import React, {RefObject, SetStateAction, useEffect, useRef, useState} from "react";
import {SLIDE_HEIGHT, SLIDE_WIDTH} from "../../constants/slideSize.ts";

const WORK_AREA_PADDING = 20

type WorkAreaProps = {
    slide?: SlideType | null,
    selectedElementId: string | null,
    setTextEditMode: React.Dispatch<SetStateAction<boolean>>,
}

const useSlideScale = (elementRef: React.RefObject<HTMLDivElement>): number | null => {
    const [scale, setScale] = useState<number | null>(null)

    useEffect(() => {
        const handleResize = () => {
            if (!elementRef || !elementRef.current) {
                return
            }

            const width = elementRef.current?.getBoundingClientRect().width - WORK_AREA_PADDING * 2
            const height = elementRef.current?.getBoundingClientRect().height - WORK_AREA_PADDING * 2

            if (!width || !height) {
                return
            }

            const scale = width / SLIDE_WIDTH < height / SLIDE_HEIGHT ? width / SLIDE_WIDTH : height / SLIDE_HEIGHT
            setScale(scale)
        }
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [elementRef])

    return scale
}

const WorkArea = ({
                      slide,
                      selectedElementId,
                      setTextEditMode
                  }: WorkAreaProps) => {

    const workAreaRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
    const scale = useSlideScale(workAreaRef) || 1

    return (
        <div ref={workAreaRef}
             className={classes.workArea}
             style={{padding: `${WORK_AREA_PADDING}px`}}
        >
            <SlideContent
                scale={scale}
                slide={slide}
                isSelected={false}
                selectedElementId={selectedElementId}
                elementStyle={classes.slide}
                setTextEditMode={setTextEditMode}
            />
        </div>
    )
}

export {WorkArea}