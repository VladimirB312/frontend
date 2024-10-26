import classes from './SlideContent.module.css';
import {ImageElement, Slide, TextElement} from "../../store/objects.ts";
import TextComponent from "./TextComponent/TextComponent.tsx";
import ImageComponent from "./ImageComponent/ImageComponent.tsx";
import {CSSProperties} from "react";

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
                const styles = el.id == selectedElementId
                    ? classes['slide__element_selected']
                    : classes['slide__element_not-selected']

                switch (el.type) {
                    case 'text':
                        return <TextComponent
                            key={el.id}
                            element={el}
                            scale={scale}
                            className={styles}
                            elementStyle={elementStyle}
                        />;
                    case 'image':
                        return <ImageComponent
                            key={el.id}
                            element={el}
                            scale={scale}
                            className={styles}
                            elementStyle={elementStyle}
                        />;
                }
            })}
        </div>
    )
}

export default SlideContent