import classes from './SlidesPreview.module.css'
import SlideContent from "../SlideContent/SlideContent.tsx";
import {useSlidesSelector} from "../hooks/useAppSelector.ts";
import {useState} from "react";

type SlidesPreviewType = {
    onClosePreview: () => void
}

function SlidesPreview({onClosePreview}:SlidesPreviewType) {
    const slides = useSlidesSelector()

    const [activeSlideIndex, setActiveSlideIndex] = useState(0)

    const onNextSlide = () => {
        setActiveSlideIndex(activeSlideIndex + 1)
    }

    const onPrevSlide = () => {
        setActiveSlideIndex(activeSlideIndex - 1)
    }

    const buttonPrevDisabled = (!slides.length || activeSlideIndex == 0)
    const buttonNextDisabled = (!slides.length || activeSlideIndex == slides.length - 1)

    return (
        <div className={classes['work-area']}>

            <SlideContent slide={slides[activeSlideIndex]}
                          isSelected={false}
                          elementStyle={classes.slide}/>
            <button
                onClick={onPrevSlide}
                disabled={buttonPrevDisabled}
            >
                Предыдущий
            </button>
            <button
                onClick={onNextSlide}
                disabled={buttonNextDisabled}
            >
                Следующий
            </button>
            <button
                onClick={onClosePreview}
            >
                Закрыть
            </button>
        </div>
    )
}

export default SlidesPreview;