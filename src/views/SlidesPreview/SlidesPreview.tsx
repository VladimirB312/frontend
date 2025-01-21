import classes from './SlidesPreview.module.css'
import {SlideContent} from "../SlideContent/SlideContent.tsx"
import {usePresentationSelector, useSlidesSelector} from "../../hooks/useAppSelector.ts"
import {useEffect, useState} from "react"
import {Button} from "../../components/Button/Button.tsx"
import {exportToPdf} from "../../utils/exportToPDF.ts"
import {arrowLeftIcon, arrowRightIcon, closeIcon, generatePdfIcon} from "../../components/icons.ts"
import {useWindowResize} from "../../hooks/useWindowResize.tsx"
import {SLIDE_HEIGHT, SLIDE_WIDTH} from "../../constants/slideSize.ts"

const usePreviewControlsHandler = (
    activeSlideIndex: number,
    setActiveSlideIndex: (x: number) => void,
    onClosePreview: () => void,
) => {
    const slides = useSlidesSelector()

    const onNextSlide = () => {
        if (activeSlideIndex >= slides.length - 1) {
            return
        }
        setActiveSlideIndex(activeSlideIndex + 1)
    }

    const onPrevSlide = () => {
        if (activeSlideIndex == 0){
            return
        }
        setActiveSlideIndex(activeSlideIndex - 1)
    }

    useEffect(() => {
        const prevDisabled = (!slides.length || activeSlideIndex == 0)
        const nextDisabled = (!slides.length || activeSlideIndex == slides.length - 1)

        const handleKeydown = (e: KeyboardEvent) => {
            if ((e.code == 'ArrowRight' || e.code == 'Space') && !nextDisabled) {
                onNextSlide()
            }
            if (e.code == 'ArrowLeft' && !prevDisabled) {
                onPrevSlide()
            }

            if (e.code == 'Escape') {
                onClosePreview()
            }
        }

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY > 0 && !nextDisabled) {
                onNextSlide()
            }
            if (e.deltaY < 0 && !prevDisabled) {
                onPrevSlide()
            }
        }

        document.addEventListener('keydown', handleKeydown)
        document.addEventListener('wheel', handleWheel)

        return () => {
            document.removeEventListener('keydown', handleKeydown)
            document.removeEventListener('wheel', handleWheel)
        }

    }, [activeSlideIndex, onClosePreview, onNextSlide, onPrevSlide, slides.length])

    return {
        onPrevSlide,
        onNextSlide,
    }
}

type SlidesPreviewType = {
    onClosePreview: () => void,
}

const SlidesPreview = ({
                           onClosePreview,
                       }: SlidesPreviewType) => {
    const slides = useSlidesSelector()

    const [activeSlideIndex, setActiveSlideIndex] = useState(0)
    const presentation = usePresentationSelector()

    const {onNextSlide, onPrevSlide} = usePreviewControlsHandler(activeSlideIndex, setActiveSlideIndex, onClosePreview)

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
            <div className={classes.slideWrapper}>
                <SlideContent
                    scale={windowScale * 0.8}
                    className={classes.slide}
                    slide={slides[activeSlideIndex]}
                    isSelected={false}/>
                <div className={classes.controlsButtons}>
                    <Button
                        title={'Закрыть'}
                        onClick={onClosePreview}
                        icon={closeIcon}
                    />
                    <Button
                        title={'Предыдущий'}
                        onClick={onPrevSlide}
                        disabled={buttonPrevDisabled}
                        icon={arrowLeftIcon}
                    />
                    <Button
                        title={'Следующий'}
                        onClick={onNextSlide}
                        disabled={buttonNextDisabled}
                        icon={arrowRightIcon}
                    />
                    <Button
                        title={'Экспортировать в PDF'}
                        onClick={onExportClick}
                        icon={generatePdfIcon}
                    />
                </div>
            </div>
        </div>
    )
}

export {SlidesPreview}