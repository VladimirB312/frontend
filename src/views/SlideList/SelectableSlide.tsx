import SlideContent from "../SlideContent/SlideContent.tsx";
import {Slide} from "../../store/objects.ts";
import {dispatch} from "../../store/editor.ts";
import {setActiveSlide, setSelectionSlide} from "../../store/setActiveSlide.ts";
import {useRef} from "react";

type SlideProps = {
    slide: Slide,
    scale: number,
    isSelected: boolean,
    className?: string,
    id: string
}

export function SelectableSlide({
                                    scale,
                                    slide,
                                    className,
                                    isSelected,
                                    id
                                }: SlideProps) {

    const elementRef = useRef<HTMLDivElement>(null)

    // const pos = useDNDSlides(elementRef)
    // const newStyle: CSSProperties = {
    //     position: `relative`,
    //     top: `150px`,
    //     left: `150px`,
    // }

    const onSlideClick = (event: React.MouseEvent<HTMLDivElement>, slideId: string) => {

        if (event.ctrlKey) {
            dispatch(setSelectionSlide, {
                slideId: slideId,
            })
            return;
        }

        dispatch(setActiveSlide, {
            slideId: slideId,
        })
    }

    return (
        <div ref={elementRef}
             id={id}
             onClick={(event) => {
                 onSlideClick(event, slide.id)
             }}
        // style={newStyle}
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