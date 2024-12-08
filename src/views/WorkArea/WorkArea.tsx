import {SlideType} from "../../store/types.ts";
import classes from './WorkArea.module.css'
import SlideContent from "../SlideContent/SlideContent.tsx";

type WorkAreaProps = {
    slide?: SlideType | null;
    selectedElementId: string | null;
}

function WorkArea({
                      slide,
                      selectedElementId
                  }: WorkAreaProps) {
    return (
        <div className={classes['work-area']}>
            <SlideContent slide={slide}
                          isSelected={false}
                          selectedElementId={selectedElementId}
                          elementStyle={classes.slide}/>
        </div>
    )
}

export default WorkArea;