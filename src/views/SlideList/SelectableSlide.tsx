import SlideContent from "../SlideContent/SlideContent.tsx";
import {Position, Slide} from "../../store/objects.ts";
import {dispatch} from "../../store/editor.ts";
import {setActiveSlide, setSelectionSlide} from "../../store/setActiveSlide.ts";
import {CSSProperties, useRef} from "react";

type SlideProps = {
    slide: Slide,
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


    // const newStyle: CSSProperties = {
    //     position: `relative`,
    //     top: newPosition ? newPosition.y : `0`,
    //     left: newPosition ? newPosition.x : `0`,
    // }

    // const onSlideClick = (event: React.MouseEvent<HTMLDivElement>, slideId: string) => {
    //
    //     if (event.ctrlKey) {
    //         dispatch(setSelectionSlide, {
    //             slideId: slideId,
    //         })
    //         return;
    //     }
    //
    //     dispatch(setActiveSlide, {
    //         slideId: slideId,
    //     })
    // }

    return (
        <div ref={elementRef}
             data-slide-id={id}
             // onClick={(event) => {
             //     onSlideClick(event, slide.id)
             // }}
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