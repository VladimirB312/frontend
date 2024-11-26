import classes from './SlideList.module.css'
import {Position, Slide} from "../../store/objects.ts";
import SlideContent from "../SlideContent/SlideContent.tsx";
import {SelectionType} from "../../store/EditorType.ts";
import {SelectableSlide} from "./SelectableSlide.tsx";
import {CSSProperties, useEffect, useRef, useState} from "react";
import {dispatch} from "../../store/editor.ts";
import {changeSlidePos} from "../../store/changePosSlide.ts";
import {setActiveSlide, setSelectionSlide} from "../../store/setActiveSlide.ts";

const SLIDE_PREVIEW_SCALE = 0.2;

type SlideListProps = {
    slides: Array<Slide>,
    selection: SelectionType | null,
}

function getSlideId(node: Element): string | null {
    const element: Element | null = node;

    // while (element != null) {
    if (element.getAttribute('data-slide-id')) {
        return element.getAttribute('data-slide-id');
    }
    // element = element.parentNode as Element;
    // }
    return null;
}

function SlideList({slides, selection}: SlideListProps) {
    const slideListRef = useRef<HTMLDivElement>(null)

    const [dndPosition, setDndPosition] = useState<Position | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startPos, setStartPos] = useState<Position | null>(null)
    const [draggedSlideId, setDraggedSlideId] = useState<null | string>(null)

    if (slides.length == 0) {
        return (
            <div className={classes['slide-list']}>
                <SlideContent scale={SLIDE_PREVIEW_SCALE} isSelected={false}/>
            </div>
        )
    }

    const draggingStyle: CSSProperties = {
        position: 'absolute',
        top: dndPosition ? `${dndPosition.y}px` : `0`,
        left: dndPosition ? `${dndPosition.x}px` : `0`,
        pointerEvents: `none`,
        userSelect: `none`,
    }

    const handleClick = (event, slideId: string) => {
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

    useEffect(() => {
        const onMouseDown = (event) => {

            const slideId = getSlideId(event.target as Element)
            setIsDragging(false)
            if (slideId) {
                setDraggedSlideId(slideId)
                setStartPos({x: event.pageX, y: event.pageY})
                setDndPosition({x: event.target.getBoundingClientRect().x, y: event.target.getBoundingClientRect().y})
                console.log('cord = ', event.target.getBoundingClientRect())
            }
        }

        const onMouseMove = (e) => {
            e.preventDefault()

            if (!draggedSlideId || !startPos || !dndPosition) {
                return
            }
            if (!selection?.selectedSlidesId?.includes(draggedSlideId)) {
                dispatch(setActiveSlide, {
                    slideId: draggedSlideId,
                })
            }
            setIsDragging(true)
            const delta = {x: e.pageX - startPos.x, y: e.pageY - startPos.y}
            setStartPos({x: e.pageX, y: e.pageY})
            const newPos = {x: dndPosition.x + delta.x, y: dndPosition.y + delta.y}
            setDndPosition(newPos)

        }

        const onMouseUp = (event) => {
            if (!draggedSlideId) {
                setIsDragging(false)
                setDndPosition(null)
                setStartPos(null)
                return
            }

            const newSlideId = getSlideId(event.target as Element)

            if (!isDragging && newSlideId) {
                console.log('click')
                handleClick(event, newSlideId)
            } else if (newSlideId && draggedSlideId != newSlideId) {
                dispatch(changeSlidePos, {
                    slideId: draggedSlideId,
                    newSlideId: newSlideId
                })
            }

            setDraggedSlideId(null)
            setIsDragging(false)
            setDndPosition(null)
            setStartPos(null)
        }

        document.addEventListener('mousedown', onMouseDown)
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)

        return () => {
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

    }, [dndPosition, isDragging, startPos, draggedSlideId]);


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
                                    className={classes.slide}
                                    // newPosition={dndPosition}
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