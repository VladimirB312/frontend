import classes from './SlideList.module.css'
import {Slide} from "../../store/objects.ts";
import SlideContent from "../SlideContent/SlideContent.tsx";
import {SelectionType} from "../../store/EditorType.ts";
import {dispatch} from "../../store/editor.ts";
import {setSelection} from "../../store/setSelection.ts";

const SLIDE_PREVIEW_SCALE = 0.2;

type SlideListProps = {
    slides: Array<Slide>,
    selection: SelectionType | null,
}

function SlideList(props: SlideListProps) {
    const onSlideClick = (slideId: string) => {
        dispatch(setSelection, {
            slideId: slideId,
        })
    }

    if (props.slides.length == 0) {
        return (
            <div className={classes['slide-list']}>
                <SlideContent scale={SLIDE_PREVIEW_SCALE} isSelected={false}/>
            </div>
        )
    }

    return (
        <div className={classes['slide-list']}>
            {props.slides.map(slide => {
                return (
                    <div key={slide.id} onClick={() => onSlideClick(slide.id)}>
                        <SlideContent
                            slide={slide}
                            scale={SLIDE_PREVIEW_SCALE}
                            isSelected={slide.id == props.selection?.selectedSlideId}
                            className={classes.slide}/>
                    </div>
                )
            })}
        </div>
    )
}

export default SlideList