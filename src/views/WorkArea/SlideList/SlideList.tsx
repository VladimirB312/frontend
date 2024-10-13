import classes from './SlideList.module.css'
import {Slide} from "../../../store/objects.ts";
import SlideContent from "../SlideContent/SlideContent.tsx";

type SlideListProps = {
    slides: Array<Slide>
}

function SlideList(props: SlideListProps) {
    return (
        <div className={classes['slide-list']}>
            {props.slides.map(sl => {
                return (
                    <div className={classes['slide']} key={sl.id}>
                        <SlideContent slide={sl} scale={0.2}/>
                    </div>
                )
            })}
        </div>
    )
}

export default SlideList