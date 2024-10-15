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
    className?: string
}

function SlideContent(props: SlideProps) {
    const scale = props.scale ? props.scale : 1;

    if (!props.slide) {
        const emptyStyle: CSSProperties = {
            width: `${SLIDE_WIDTH * scale}px`,
            height: `${SLIDE_HEIGHT * scale}px`,
        }
        return <div className={classes.slide} style={emptyStyle}></div>
    }

    const slideStyle: CSSProperties = {
        backgroundColor: props.slide.background.type == 'solid'
            ? props.slide.background.color
            : '',
        backgroundImage: props.slide.background.type == 'image'
            ? `url(${props.slide.background.src}`
            : '',
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
        border: `1px solid #d3d3d3`
    }

    if (props.isSelected) {
        slideStyle.border = '3px solid #0b57d0';
    }

    const elements: Array<TextElement | ImageElement> = props.slide.objects

    return (
        <div className={classes.slide + ' ' + props.className} style={slideStyle}>
            {elements.map(el => {
                switch (el.type) {
                    case 'text':
                        return <TextComponent key={el.id} element={el} scale={scale}/>;
                    case 'image':
                        return <ImageComponent key={el.id} element={el} scale={scale}/>;
                }
            })}
        </div>
    )
}

export default SlideContent