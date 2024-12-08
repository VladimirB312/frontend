import classes from './SlideList.module.css'
import SlideContent from "../SlideContent/SlideContent.tsx";
import {SelectableSlide} from "./SelectableSlide.tsx";
import {CSSProperties, useRef, } from "react";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {useSlideListDnd} from "../hooks/useSlideListDnd.tsx";

const SLIDE_PREVIEW_SCALE = 0.2;

function SlideList() {
    const editor = useAppSelector((editor => editor))
    const slides = editor.presentation.slides
    const selection = editor.selection

    const slideListRef = useRef<HTMLDivElement>(null)
    const {isDragging, dndPosition} = useSlideListDnd(slideListRef, selection)

    if (slides.length == 0) {
        return (
            <div className={classes['slide-list']}>
                <SlideContent scale={SLIDE_PREVIEW_SCALE} isSelected={false}/>
            </div>
        )
    }

    const draggingStyle: CSSProperties = {
        position: 'fixed',
        top: dndPosition ? `${dndPosition.y}px` : `0`,
        left: dndPosition ? `${dndPosition.x}px` : `0`,
        pointerEvents: `none`,
        userSelect: `none`,
    }

    return (
        <div ref={slideListRef}
             className={classes['slide-list']}>
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
            {isDragging ? <div style={draggingStyle}>
                {slides.map(slide => {
                        if (selection?.selectedSlidesId?.includes(slide.id)) {
                            return (
                                <SelectableSlide
                                    key={slide.id}
                                    id={slide.id}
                                    slide={slide}
                                    scale={SLIDE_PREVIEW_SCALE}
                                    isSelected={selection?.selectedSlidesId?.includes(slide.id) ?? false}
                                    className={classes.slide + ' ' + classes.draggedSlide}
                                />
                            )

                        } else {
                            return null
                        }
                    }
                )}
            </div> : null}
        </div>
    )
}

export default SlideList