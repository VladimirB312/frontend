import {Slide} from "../../store/objects.ts";
import classes from './WorkArea.module.css'
import SlideContent from "../SlideContent/SlideContent.tsx";

type WorkAreaProps = {
    slide?: Slide | null;
    selectedElementId: string | null;
}

function WorkArea(props: WorkAreaProps) {
    return (
        <div className={classes['work-area']}>
            <SlideContent slide={props.slide} scale={1} isSelected={false} selectedElementId={props.selectedElementId}/>
        </div>
    )
}

export default WorkArea;