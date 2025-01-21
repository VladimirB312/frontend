import classes from './TopPanel.module.css'
import {Button} from "../../components/Button/Button.tsx"
import {Background, SlideType} from "../../store/types.ts"
import React, {SetStateAction} from "react"
import {Title} from "./Title.tsx"
import {LoadPresentation} from "./CustomButtons/LoadPresentation.tsx"
import {usePresentationSelector} from "../../hooks/useAppSelector.ts"
import {useNavigate} from "react-router"
import {
    backgroundIcon,
    generatePdfIcon,
    saveIcon,
    slideShowIcon,
} from "../../components/icons.ts"
import {SlidesControlsPanel} from "./Panels/SlidesControlsPanel.tsx"
import {UndoRedoControlsPanel} from "./Panels/UndoRedoControlsPanel.tsx"
import {ElementControlsPanel} from "./Panels/ElementControlsPanel.tsx"

type TopPanelProps = {
    slide: SlideType | null,
    previewUserBackground: null | Background,
    undoDisabled: boolean,
    redoDisabled: boolean,
    setPreviewUserBackground: React.Dispatch<SetStateAction<Background | null>>,
    setShowBackgroundModal: React.Dispatch<SetStateAction<boolean>>,
    setShowPreviewsSlides: React.Dispatch<SetStateAction<boolean>>,
    onOpenUnsplash: () => void,
}

const TopPanel = ({
                      slide,
                      undoDisabled,
                      redoDisabled,
                      setShowBackgroundModal,
                      setShowPreviewsSlides,
                      onOpenUnsplash
                  }: TopPanelProps) => {

    const navigate = useNavigate()
    const presentation = usePresentationSelector()

    const title = presentation.title

    const onShowBackgroundModal = () => {
        if (slide) {
            setShowBackgroundModal(true)
        }
    }

    const onSavePresentation = () => {
        const jsonEditor = JSON.stringify(presentation)
        const file = new Blob([jsonEditor], {type: "application/json"})
        const a = document.createElement('a')
        a.href = URL.createObjectURL(file)
        const fileName = title || 'presentation'
        a.download = `${fileName}.json`
        a.click()
        URL.revokeObjectURL(a.href)
    }

    const onOpenPlayerView = () => {
        navigate('/player')
    }

    const disabledSlideButton: boolean = !slide

    return (
        <div className={classes.topPanel}>
            <Title value={title}/>
            <div className={classes.presentationControls}>
                <Button
                    text={'Сохранить'}
                    onClick={onSavePresentation}
                    icon={saveIcon}
                />
                <LoadPresentation/>
                <Button text={'Экспорт в PDF'}
                        onClick={() => setShowPreviewsSlides(true)}
                        icon={generatePdfIcon}
                />
                <Button text={'Слайд-шоу'}
                        onClick={onOpenPlayerView}
                        icon={slideShowIcon}
                />
            </div>
            <div className={classes.slidesControls}>
                <SlidesControlsPanel disabledSlideButton={disabledSlideButton}/>
                <UndoRedoControlsPanel
                    undoDisabled={undoDisabled}
                    redoDisabled={redoDisabled}
                />
                <Button
                    text={'Изменить фон'}
                    onClick={onShowBackgroundModal}
                    disabled={disabledSlideButton}
                    icon={backgroundIcon}
                />
                <ElementControlsPanel
                    disabledSlideButton={disabledSlideButton}
                    onOpenUnsplash={onOpenUnsplash}
                />
            </div>
        </div>
    )
}

export {TopPanel}