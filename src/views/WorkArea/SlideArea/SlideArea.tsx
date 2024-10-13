import classes from './SlideArea.module.css';
import SlideContent from "../SlideContent/SlideContent.tsx";
import {Slide} from "../../../store/objects.ts";

type SlideProps = {
    slide: Slide,
    scale: number
}

function SlideArea(props: SlideProps) {
      return (
        <div className={classes['slide-area']}>
            <SlideContent slide={props.slide} scale={props.scale}/>
        </div>
    )
}

export default SlideArea