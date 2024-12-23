import {SlideType} from "../../store/types.ts";
import classes from './WorkArea.module.css'
import {SlideContent, SLIDE_HEIGHT, SLIDE_WIDTH} from "../SlideContent/SlideContent.tsx";
import React, {RefObject, useEffect, useRef, useState} from "react";

const WORK_AREA_PADDING = 20

type WorkAreaProps = {
    slide?: SlideType | null;
    selectedElementId: string | null;
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


function WorkArea({
                      slide,
                      selectedElementId
                  }: WorkAreaProps) {

    const workAreaRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

    return (
        <div ref={workAreaRef}
             className={classes['work-area']}
             style={{padding: `${WORK_AREA_PADDING}px`}}
        >
            <SlideContent
                scale={useSlideScale(workAreaRef) || 1}
                slide={slide}
                isSelected={false}
                selectedElementId={selectedElementId}
                elementStyle={classes.slide}/>
        </div>
    )
}

export {WorkArea}