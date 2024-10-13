import classes from './SlideContent.module.css';
import {ImageElement, Slide, TextElement} from "../../../store/objects.ts";
import TextComponent from "./Text/TextComponent.tsx";
import ImageComponent from "./ImageComponent/ImageComponent.tsx";

const SLIDE_WIDTH: number = 935;
const SLIDE_HEIGHT: number = 525;

type SlideProps = {
    slide: Slide,
    scale?: number
}

function SlideContent(props: SlideProps) {
    if (!props.slide) {
        return <div className={classes.slide}></div>
    }

    const scale = props.scale ? props.scale : 1;

    const slideStyle = {
        backgroundColor: props.slide.background.type == 'solid'
            ? props.slide.background.color
            : '',
        backgroundImage: props.slide.background.type == 'image'
            ? `url(${props.slide.background.src}`
            : '',
        width: `${SLIDE_WIDTH * scale}px`,
        height: `${SLIDE_HEIGHT * scale}px`,
    }

    const elements: Array<TextElement | ImageElement> = props.slide.objects

    return (
        <div className={classes.slide} style={slideStyle}>
            {elements.map(el => {
                return el.type == "text"
                    ? <TextComponent key={el.id} element={el} scale={scale}/>
                    : <ImageComponent key={el.id} element={el} scale={scale}/>
            })}
        </div>
    )
}

export default SlideContent