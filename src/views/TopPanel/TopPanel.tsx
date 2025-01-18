import classes from './TopPanel.module.css'
import {Button} from "../../components/Button/Button.tsx";
import {Background, SlideType} from "../../store/types.ts";
import React, {SetStateAction} from "react";
import {Title} from "./Title.tsx";
import {LoadPresentation} from "./CustomButtons/LoadPresentation.tsx";
import {useAppActions} from "../../hooks/useAppAction.ts";
import {usePresentationSelector} from "../../hooks/useAppSelector.ts";
import {useNavigate} from "react-router";
import {
    backgroundIcon,
    bringForwardIcon,
    bringFrontIcon,
    generatePdfIcon,
    saveIcon,
    sendBackwardIcon,
    sendToBackIcon,
    slideShowIcon,
} from "../../components/icons.ts";
import {TextEditPanel} from "./TextEditPanel.tsx";
import {SlidesControlsPanel} from "./Panels/SlidesControlsPanel.tsx";
import {UndoRedoControlsPanel} from "./Panels/UndoRedoControlsPanel.tsx";
import {ElementControlsPanel} from "./Panels/ElementControlsPanel.tsx";

type TopPanelProps = {
    slide: SlideType | null,
    selectedElementId: string | null,
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
                      selectedElementId,
                      undoDisabled,
                      redoDisabled,
                      setShowBackgroundModal,
                      setShowPreviewsSlides,
                      onOpenUnsplash
                  }: TopPanelProps) => {

    const navigate = useNavigate()
    const presentation = usePresentationSelector()

    const title = presentation.title

    const {
        moveElementForward,
        moveElementBackward,
        sendElementForward,
        sendElementBackward,
    } = useAppActions()


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
        a.download = `${title}.json`
        a.click()
        URL.revokeObjectURL(a.href)
    }

    const onOpenPlayerView = () => {
        navigate('/player')
    }

    const disabledSlideButton: boolean = !slide

    const disabledElementButton: boolean = !selectedElementId

    const elementIndex = slide?.objects.findIndex(element => element.id == selectedElementId)

    let disabledMoveForward = false
    const disabledMoveBackward = !selectedElementId || elementIndex == 0

    if (!selectedElementId || (slide && slide.objects.length - 1 == elementIndex)) {
        disabledMoveForward = true
    }

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
                    text={'Переместить вперед'}
                    onClick={moveElementForward}
                    disabled={disabledMoveForward}
                    icon={bringForwardIcon}
                />
                <Button
                    text={'Переместить назад'}
                    onClick={moveElementBackward}
                    disabled={disabledMoveBackward}
                    icon={sendBackwardIcon}
                />
                <Button
                    text={'На передний план'}
                    onClick={sendElementForward}
                    disabled={disabledMoveForward}
                    icon={bringFrontIcon}
                />
                <Button
                    text={'На задний план'}
                    onClick={sendElementBackward}
                    disabled={disabledMoveBackward}
                    icon={sendToBackIcon}
                />
                <Button
                    text={'Изменить фон'}
                    onClick={onShowBackgroundModal}
                    disabled={disabledSlideButton}
                    icon={backgroundIcon}
                />
                <ElementControlsPanel
                    disabledSlideButton={disabledSlideButton}
                    disabledElementButton={disabledElementButton}
                    onOpenUnsplash={onOpenUnsplash}/>
                <TextEditPanel
                    slide={slide}
                    selectedElementId={selectedElementId}
                />
            </div>
        </div>
    )
}

export {TopPanel}