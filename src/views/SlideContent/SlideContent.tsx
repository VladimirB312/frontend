import classes from './SlideContent.module.css';
import {ImageElement, SlideType, TextElement} from "../../store/types.ts";
import React, {CSSProperties, SetStateAction} from "react";
import {SelectableElement} from "./SelectableElement/SelectableElement.tsx";
import {EmptySlide} from "./EmptySlide/EmptySlide.tsx";

export const SLIDE_WIDTH: number = 935;
export const SLIDE_HEIGHT: number = 525;

type SlideProps = {
    slide?: SlideType | null,
    scale?: number,
    isSelected: boolean,
    className?: string,
    elementStyle?: string,
    selectedElementId?: string | null,
    setTextEditMode?: React.Dispatch<SetStateAction<boolean>>,
}

const SlideContent = ({
                          scale = 1,
                          slide,
                          className = '',
                          isSelected,
                          elementStyle,
                          selectedElementId,
                          setTextEditMode,
                      }: SlideProps) => {
    if (!slide) {
        const emptyStyle: CSSProperties = {
            width: `${SLIDE_WIDTH * scale}px`,
            height: `${SLIDE_HEIGHT * scale}px`,
        }
        return (
            <div
                className={classes.slide + ' ' + classes.emptySlide}
                style={emptyStyle}
            >
                <EmptySlide/>
            </div>)
    }

    const slideStyle: CSSProperties = {
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,

    }

    if (slide.background.type == 'gradient') {
        slideStyle.background = `linear-gradient(${slide.background.direction}, ${slide.background.color1}, ${slide.background.color2})`
    }

    if (slide.background.type == 'solid') {
        slideStyle.backgroundColor = slide.background.color
    }

    if (slide.background.type == 'image') {
        slideStyle.backgroundImage = `url(${slide.background.src}`
    }

    if (isSelected) {
        slideStyle.outline = '3px solid #0b57d0';
    }

    const elements: Array<TextElement | ImageElement> = slide.objects

    return (
        <div className={`${classes.slide} ${className}`}
             style={slideStyle}
             data-slide-content-id={'slideContent'}
        >
            {elements.map(el => {
                return <SelectableElement key={el.id}
                                          id={el.id}
                                          element={el}
                                          selectedElementId={selectedElementId}
                                          scale={scale}
                                          elementStyle={elementStyle}
                                          setTextEditMode={setTextEditMode}
                />
            })}
        </div>
    )
}

export {SlideContent}