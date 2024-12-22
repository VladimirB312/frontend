import SlideContent from "../SlideContent/SlideContent.tsx";
import {SlideType} from "../../store/types.ts";
import {useEffect, useRef} from "react";

type SlideProps = {
    slide: SlideType,
    scale: number,
    isSelected: boolean,
    className?: string,
    id: string,
    isActive: boolean
}

export function SelectableSlide({
                                    scale,
                                    slide,
                                    className,
                                    isSelected,
                                    isActive,
                                    id,
                                }: SlideProps) {

    const elementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isActive) {
            elementRef?.current?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            })
        }
    }, [isActive])

    return (
        <div ref={elementRef}
             data-slide-id={id}
        >
            <SlideContent
                slide={slide}
                scale={scale}
                isSelected={isSelected}
                className={className}
            />
        </div>
    )
}