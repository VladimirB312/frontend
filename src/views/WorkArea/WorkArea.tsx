import {Slide} from "../../store/objects.ts";
import classes from './WorkArea.module.css'
import SlideList from "./SlideList/SlideList.tsx";
import SlideArea from "./SlideArea/SlideArea.tsx";

type WorkAreaProps = {
    slides: Array<Slide>;
}

function WorkArea(props: WorkAreaProps) {
    return (
        <div className={classes['work-area']}>
            <SlideList slides={props.slides}/>
            <div className={classes['work-area__slide']}>
                <SlideArea slide={props.slides[0]} scale={1}/>
            </div>
        </div>
    )
}

export default WorkArea;