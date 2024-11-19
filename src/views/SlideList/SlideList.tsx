import classes from './SlideList.module.css'
import {Slide} from "../../store/objects.ts";
import SlideContent from "../SlideContent/SlideContent.tsx";
import {SelectionType} from "../../store/EditorType.ts";
import {SelectableSlide} from "./SelectableSlide.tsx";
import {useRef} from "react";
import {dispatch} from "../../store/editor.ts";
import {changeSlidePos} from "../../store/changePosSlide.ts";

const SLIDE_PREVIEW_SCALE = 0.2;

type SlideListProps = {
    slides: Array<Slide>,
    selection: SelectionType | null,
}

function SlideList({slides, selection}: SlideListProps) {
    const slideListRef = useRef<HTMLDivElement>(null)

    if (slides.length == 0) {
        return (
            <div className={classes['slide-list']}>
                <SlideContent scale={SLIDE_PREVIEW_SCALE} isSelected={false}/>
            </div>
        )
    }

    const onMouseDown = (event) => {


        const slideId = event.target.id;

        if (slideId) {

            const handleMouseUp = (e) => onMouseUp(e, slideId);

            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener(
                'mouseup',
                () => {
                    document.removeEventListener('mouseup', handleMouseUp);
                },
                {once: true}
            );
        }
    };

    const onMouseUp = (event, slideId: string) => {
        if (slideId == event.target.id) {
            return
        }

        dispatch(changeSlidePos, {
            slideId: slideId,
            newSlideId: event.target.id
        });
    };

    return (
        <div ref={slideListRef}
             className={classes['slide-list']}
             onMouseDown={(event) => {
                 onMouseDown(event)
             }}>
            {slides.map(slide => {
                return (
                    <SelectableSlide
                        key={slide.id}
                        id={slide.id}
                        slide={slide}
                        scale={SLIDE_PREVIEW_SCALE}
                        isSelected={selection?.selectedSlidesId?.includes(slide.id) ?? false}
                        className={classes.slide}
                    />
                )
            })}
        </div>
    )
}

export default SlideList