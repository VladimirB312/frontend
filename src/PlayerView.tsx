import classes from './PlayerView.module.css'
import {useState} from "react";
import {useSelectionSelector, useSlidesSelector} from "./hooks/useAppSelector.ts";
import {SlideContent} from "./views/SlideContent/SlideContent.tsx";
import {useWindowResize} from "./hooks/useWindowResize.tsx";
import {PlayerControls} from "./views/PlayerControls/PlayerControls.tsx";
import {SelectionType, SlideType} from "./store/types.ts";
import {SLIDE_HEIGHT, SLIDE_WIDTH} from "./constants/slideSize.ts";

const getStartSlideIndex = (slides: SlideType[],  selection: SelectionType | null) => {
    const activeSlideId = selection?.activeSlideId
    let startSlideIndex = slides.findIndex(slide => slide.id == activeSlideId)
    if (startSlideIndex == -1) {
        startSlideIndex = 0;
    }

    return startSlideIndex
}

const PlayerView = () => {
    const slides = useSlidesSelector()
    const selection = useSelectionSelector()

    const [activeSlideIndex, setActiveSlideIndex] = useState(getStartSlideIndex(slides, selection))

    const {width, height} = useWindowResize()
    const windowScale = width / SLIDE_WIDTH < height / SLIDE_HEIGHT
        ? width / SLIDE_WIDTH
        : height / SLIDE_HEIGHT

    return (
        <div className={classes['preview-wrapper']}>
            <div>
                <SlideContent
                    scale={windowScale}
                    className={classes.slide}
                    slide={slides[activeSlideIndex]}
                    isSelected={false}/>
            </div>
            <PlayerControls
                slides={slides}
                activeSlideIndex={activeSlideIndex}
                setActiveSlideIndex={setActiveSlideIndex}
            />
        </div>
    )
}

export {PlayerView};