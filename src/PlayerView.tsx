import classes from './PlayerView.module.css'
import {useEffect, useState} from "react";
import {useSlidesSelector} from "./views/hooks/useAppSelector.ts";
import {SlideContent, SLIDE_HEIGHT, SLIDE_WIDTH} from "./views/SlideContent/SlideContent.tsx";
import {Button} from "./components/Button/Button.tsx";
import {useNavigate} from "react-router";
import {useWindowResize} from "./views/hooks/useWindowResize.tsx";

function SlidesPreview() {
    const slides = useSlidesSelector()
    const navigate = useNavigate()

    const [activeSlideIndex, setActiveSlideIndex] = useState(0)

    useEffect(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => console.log(err))
        }


        return () => {
            if (document.exitFullscreen && document.fullscreenElement) {
                document.exitFullscreen().catch((err) => console.log(err))
            }
        }

    }, [])

    useEffect(() => {
        const onNextSlide = () => {
            setActiveSlideIndex(activeSlideIndex + 1)
        }

        const onPrevSlide = () => {
            setActiveSlideIndex(activeSlideIndex - 1)
        }


        const prevDisabled = (!slides.length || activeSlideIndex == 0)
        const nextDisabled = (!slides.length || activeSlideIndex == slides.length - 1)

        const handleKeydown = (e: KeyboardEvent) => {
            if (e.code == 'ArrowRight' && !nextDisabled) {
                onNextSlide()
            }
            if (e.code == 'ArrowLeft' && !prevDisabled) {
                onPrevSlide()
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

    }, [activeSlideIndex, navigate, slides.length])

    const onNextSlide = () => {
        setActiveSlideIndex(activeSlideIndex + 1)
    }

    const onPrevSlide = () => {
        setActiveSlideIndex(activeSlideIndex - 1)
    }

    const onClosePlayerView = () => {
        navigate('/')
    }

    const buttonPrevDisabled = (!slides.length || activeSlideIndex == 0)
    const buttonNextDisabled = (!slides.length || activeSlideIndex == slides.length - 1)

    const {width, height} = useWindowResize()
    const windowScale = width / SLIDE_WIDTH < height / SLIDE_HEIGHT ? width / SLIDE_WIDTH : height / SLIDE_HEIGHT

    return (
        <div className={classes['preview-wrapper']}>
            <div>
                <SlideContent
                    scale={windowScale}
                    className={classes.slide}
                    slide={slides[activeSlideIndex]}
                    isSelected={false}/>
            </div>
            <div className={classes.buttons}>
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
                    onClick={onClosePlayerView}
                    text={'Вернуться'}
                />
            </div>

        </div>
    )
}

export default SlidesPreview;