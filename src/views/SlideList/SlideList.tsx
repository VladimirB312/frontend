import classes from './SlideList.module.css'
import {Slide} from "../../store/objects.ts";
import SlideContent from "../SlideContent/SlideContent.tsx";
import {SelectionType} from "../../store/EditorType.ts";
import {dispatch} from "../../store/editor.ts";
import {setActiveSlide, setSelectionSlide} from "../../store/setActiveSlide.ts";

const SLIDE_PREVIEW_SCALE = 0.2;

type SlideListProps = {
    slides: Array<Slide>,
    selection: SelectionType | null,
}

function SlideList({slides, selection}: SlideListProps) {
    const onSlideClick = (event: React.MouseEvent<HTMLDivElement>, slideId: string) => {
        if (event.ctrlKey) {
            dispatch(setSelectionSlide, {
                slideId: slideId,
            })
            return;
        }

        dispatch(setActiveSlide, {
            slideId: slideId,
        })
    }


    if (slides.length == 0) {
        return (
            <div className={classes['slide-list']}>
                <SlideContent scale={SLIDE_PREVIEW_SCALE} isSelected={false}/>
            </div>
        )
    }

    return (
        <div className={classes['slide-list']}>
            {slides.map(slide => {
                return (
                    <div key={slide.id} onClick={(event) => {
                        onSlideClick(event, slide.id)
                    }}>

                        <SlideContent
                            slide={slide}
                            scale={SLIDE_PREVIEW_SCALE}
                            isSelected={selection?.selectedSlidesId?.includes(slide.id) ?? false}
                            className={classes.slide}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default SlideList