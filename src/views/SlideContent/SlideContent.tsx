import classes from './SlideContent.module.css';
import {ImageElement, Slide, TextElement} from "../../store/objects.ts";
import {CSSProperties} from "react";
import {SelectableElement} from "./SelectableElement/SelectableElement.tsx";

const SLIDE_WIDTH: number = 935;
const SLIDE_HEIGHT: number = 525;

type SlideProps = {
    slide?: Slide | null,
    scale?: number,
    isSelected: boolean,
    className?: string,
    elementStyle?: string,
    selectedElementId?: string | null,
}

function SlideContent({
                          scale = 1,
                          slide,
                          className = '',
                          isSelected,
                          elementStyle,
                          selectedElementId,
                      }: SlideProps) {
    if (!slide) {
        const emptyStyle: CSSProperties = {
            width: `${SLIDE_WIDTH * scale}px`,
            height: `${SLIDE_HEIGHT * scale}px`,
        }
        return <div className={classes.slide} style={emptyStyle}></div>
    }

    const slideStyle: CSSProperties = {
        backgroundColor: slide.background.type == 'solid'
            ? slide.background.color
            : '',
        backgroundImage: slide.background.type == 'image'
            ? `url(${slide.background.src}`
            : '',
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
        border: `1px solid #d3d3d3`
    }

    if (isSelected) {
        slideStyle.border = '3px solid #0b57d0';
    }

    const elements: Array<TextElement | ImageElement> = slide.objects

    return (
        <div className={classes.slide + ' ' + className} style={slideStyle}>
            {elements.map(el => {
                return <SelectableElement key={el.id}
                                          element={el}
                                          selectedElementId={selectedElementId}
                                          scale={scale}
                                          elementStyle={elementStyle}
                />
            })}
        </div>
    )
}

export default SlideContent