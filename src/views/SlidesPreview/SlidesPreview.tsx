import classes from './SlidesPreview.module.css'
import SlideContent from "../SlideContent/SlideContent.tsx";
import {usePresentationSelector, useSlidesSelector} from "../hooks/useAppSelector.ts";
import {useState} from "react";
import Button from "../../components/Button/Button.tsx";
import {exportToPdf} from "../../utils/exportToPDF.ts";

type SlidesPreviewType = {
    onClosePreview: () => void
}

function SlidesPreview({onClosePreview}: SlidesPreviewType) {
    const slides = useSlidesSelector()

    const [activeSlideIndex, setActiveSlideIndex] = useState(0)
    const presentation = usePresentationSelector()

    const onNextSlide = () => {
        setActiveSlideIndex(activeSlideIndex + 1)
    }

    const onPrevSlide = () => {
        setActiveSlideIndex(activeSlideIndex - 1)
    }

    const onExportClick = () => {
        exportToPdf(presentation)
    }

    const buttonPrevDisabled = (!slides.length || activeSlideIndex == 0)
    const buttonNextDisabled = (!slides.length || activeSlideIndex == slides.length - 1)

    return (
        <div className={classes['modal-wrapper']}>
            <div>
                <SlideContent
                    scale={1.2}
                    className={classes.slide}
                    slide={slides[activeSlideIndex]}
                    isSelected={false}/>
            </div>
            <div>
                <Button
                    onClick={onPrevSlide}
                    text={'Предыдущий'}
                    disabled={buttonPrevDisabled}
                />
                <Button
                    onClick={onNextSlide}
                    text={'Следующий'}
                    disabled={buttonNextDisabled}
                />
                <Button
                    onClick={onExportClick}
                    text={'Сохранить'}
                />
                <Button
                    onClick={onClosePreview}
                    text={'Закрыть'}
                />

            </div>

        </div>
    )
}

export default SlidesPreview;