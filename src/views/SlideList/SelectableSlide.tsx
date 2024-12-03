import SlideContent from "../SlideContent/SlideContent.tsx";
import {SlideType} from "../../store/objects.ts";
import {useRef} from "react";

type SlideProps = {
    slide: SlideType,
    scale: number,
    isSelected: boolean,
    className?: string,
    id: string,
    // newPosition?: null | Position,
}

export function SelectableSlide({
                                    scale,
                                    slide,
                                    className,
                                    isSelected,
                                    id,
                                }: SlideProps) {

    const elementRef = useRef<HTMLDivElement>(null)

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