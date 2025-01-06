import classes from './SlidesPreview.module.css'
import {SLIDE_HEIGHT, SLIDE_WIDTH, SlideContent} from "../SlideContent/SlideContent.tsx";
import {usePresentationSelector, useSlidesSelector} from "../hooks/useAppSelector.ts";
import {useState} from "react";
import {Button} from "../../components/Button/Button.tsx";
import {exportToPdf} from "../../utils/exportToPDF.ts";
import {arrowLeftIcon, arrowRightIcon, closeIcon, generatePdfIcon} from "../../components/icons.ts";
import {useWindowResize} from "../hooks/useWindowResize.tsx";

type SlidesPreviewType = {
    onClosePreview: () => void,
}

const SlidesPreview = ({
                           onClosePreview,
                       }: SlidesPreviewType) => {
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

    const {width, height} = useWindowResize()
    const windowScale = width / SLIDE_WIDTH < height / SLIDE_HEIGHT
        ? width / SLIDE_WIDTH
        : height / SLIDE_HEIGHT

    const buttonPrevDisabled = (!slides.length || activeSlideIndex == 0)
    const buttonNextDisabled = (!slides.length || activeSlideIndex == slides.length - 1)

    return (
        <div className={classes.modalWrapper}>
            <div>
                <SlideContent
                    scale={windowScale * 0.8}
                    className={classes.slide}
                    slide={slides[activeSlideIndex]}
                    isSelected={false}/>
            </div>
            <div className={classes.controlsButtons}>
                <Button
                    onClick={onPrevSlide}
                    disabled={buttonPrevDisabled}
                    icon={arrowLeftIcon}
                />
                <Button
                    onClick={onNextSlide}
                    disabled={buttonNextDisabled}
                    icon={arrowRightIcon}
                />
                <Button
                    onClick={onExportClick}
                    icon={generatePdfIcon}

                />
                <Button
                    onClick={onClosePreview}
                    icon={closeIcon}
                />

            </div>


        </div>
    )
}

export {SlidesPreview}