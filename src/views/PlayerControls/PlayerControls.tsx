import classes from "./PlayerControls.module.css";
import {Button} from "../../components/Button/Button.tsx";
import {useSlidesSelector} from "../../hooks/useAppSelector.ts";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {SlideType} from "../../store/types.ts";
import {arrowLeftIcon, arrowRightIcon, closeIcon} from "../../components/icons.ts";

const EDITOR_URL = '/'

const usePlayerControlsHandler = (
    activeSlideIndex: number,
    setActiveSlideIndex: (x: number) => void,
) => {
    const slides = useSlidesSelector()
    const navigate = useNavigate()
    
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
        }

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY > 0 && !nextDisabled) {
                onNextSlide()
            }
            if (e.deltaY < 0 && !prevDisabled) {
                onPrevSlide()
            }
        }

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                onClosePlayerView()
            }
        }

        document.addEventListener('keydown', handleKeydown)
        document.addEventListener('wheel', handleWheel)
        document.addEventListener('fullscreenchange', handleFullscreenChange)

        return () => {
            document.removeEventListener('keydown', handleKeydown)
            document.removeEventListener('wheel', handleWheel)
            document.removeEventListener('fullscreenchange', handleFullscreenChange)
        }

    }, [activeSlideIndex, navigate, onNextSlide, onPrevSlide, setActiveSlideIndex, slides.length])

    const onClosePlayerView = () => {
        navigate(EDITOR_URL)
    }

    return {
        onPrevSlide,
        onNextSlide,
        onClosePlayerView
    }
}

type PlayerControlsPropsType = {
    slides: SlideType[]
    activeSlideIndex: number,
    setActiveSlideIndex: (x: number) => void,
}

function PlayerControls({slides, activeSlideIndex, setActiveSlideIndex}: PlayerControlsPropsType) {
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

    const prevDisabled = (!slides.length || activeSlideIndex == 0)
    const nextDisabled = (!slides.length || activeSlideIndex == slides.length - 1)

    const {
        onPrevSlide,
        onNextSlide,
        onClosePlayerView
    } = usePlayerControlsHandler(activeSlideIndex, setActiveSlideIndex)

    return (
        <div className={classes.buttons}>
            <Button
                icon={arrowLeftIcon}
                onClick={onPrevSlide}
                disabled={prevDisabled}
            />
            <Button
                icon={arrowRightIcon}
                onClick={onNextSlide}
                disabled={nextDisabled}
            />
            <Button
                icon={closeIcon}
                onClick={onClosePlayerView}
            />
        </div>
    )
}

export {PlayerControls}