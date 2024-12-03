import classes from './SlideList.module.css'
import {Position} from "../../store/objects.ts";
import SlideContent from "../SlideContent/SlideContent.tsx";
import {SelectableSlide} from "./SelectableSlide.tsx";
import {CSSProperties, useEffect, useRef, useState} from "react";
import {dispatch} from "../../store/editor.ts";
import {changeSlidePos} from "../../store/changePosSlide.ts";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {useAppActions} from "../hooks/useAppAction.ts";

const SLIDE_PREVIEW_SCALE = 0.2;

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

function SlideList() {
    const slideListRef = useRef<HTMLDivElement>(null)

    const [dndPosition, setDndPosition] = useState<Position | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startPos, setStartPos] = useState<Position | null>(null)
    const [draggedSlideId, setDraggedSlideId] = useState<null | string>(null)

    const editor = useAppSelector((editor => editor))
    const slides = editor.presentation.slides
    const selection = editor.selection

    const {setSelectionSlide, setActiveSlide} = useAppActions()

    const handleClick = (event: MouseEvent, slideId: string) => {
        if (event.ctrlKey) {
            setSelectionSlide(slideId)
            return;
        }

        setActiveSlide(slideId)
    }

    useEffect(() => {
        const onMouseDown = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            const slideId = getSlideId(event.target as Element)
            setIsDragging(false)
            if (slideId) {
                setDraggedSlideId(slideId)
                setStartPos({x: event.pageX, y: event.pageY})
                setDndPosition({x: target.getBoundingClientRect().x, y: target.getBoundingClientRect().y})
            }
        }

        const onMouseMove = (event: MouseEvent) => {
            event.preventDefault()

            if (!draggedSlideId || !startPos || !dndPosition) {
                return
            }

            if (!selection?.selectedSlidesId?.includes(draggedSlideId)) {
                setActiveSlide(draggedSlideId)
            }

            setIsDragging(true)

            if (slideListRef.current && event.pageY < slideListRef.current.getBoundingClientRect().y + 50) {
                slideListRef.current.scrollTop = slideListRef.current.scrollTop - 10
            }

            if (slideListRef.current && event.pageY > slideListRef.current.clientHeight + slideListRef.current.getBoundingClientRect().y - 50) {
                slideListRef.current.scrollTop = slideListRef.current.scrollTop + 10
            }

            const delta = {x: event.pageX - startPos.x, y: event.pageY - startPos.y}
            setStartPos({x: event.pageX, y: event.pageY})
            const newPos = {x: dndPosition.x + delta.x, y: dndPosition.y + delta.y}
            setDndPosition(newPos)

        }

        const onMouseUp = (event: MouseEvent) => {
            if (!draggedSlideId) {
                setIsDragging(false)
                setDndPosition(null)
                setStartPos(null)
                return
            }

            const newSlideId = getSlideId(event.target as Element)

            if (!isDragging && newSlideId) {
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

            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousedown', onMouseDown)
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)

        return () => {
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

    }, [dndPosition, isDragging, startPos, draggedSlideId, selection?.selectedSlidesId]);

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