import classes from './TopPanel.module.css'
import {Button} from "../../components/Button/Button.tsx";
import {Background, SlideType} from "../../store/types.ts";
import React, {SetStateAction} from "react";
import {DownloadImage} from "./CustomButtons/DownloadImage.tsx";
import {Title} from "./Title.tsx";
import {LoadPresentation} from "./CustomButtons/LoadPresentation.tsx";
import {useAppActions} from "../hooks/useAppAction.ts";
import {usePresentationSelector} from "../hooks/useAppSelector.ts";
import {useNavigate} from "react-router";
import {
    addSlideIcon, backgroundIcon, bringForwardIcon, bringFrontIcon, deleteIcon,
    deleteSlideIcon,
    generatePdfIcon,
    redoIcon,
    saveIcon, sendBackwardIcon, sendToBackIcon,
    slideShowIcon, textAddIcon,
    undoIcon, unsplashIcon
} from "../../components/icons.ts";
import {TextEdit} from "./TextEdit.tsx";

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
        addSlide,
        removeSlide,
        renamePresentation,
        removeElement,
        addTextElement,
        moveElementForward,
        moveElementBackward,
        sendElementForward,
        sendElementBackward,
        undo,
        redo
    } = useAppActions()

    const onTitleChange: React.ChangeEventHandler = (event) => {
        renamePresentation((event.target as HTMLInputElement).value);
    }

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

    const slideShowButtonStyle = {
        backgroundColor: 'rgba(11,87,208,0.44)'
    }

    return (
        <div className={classes.topPanel}>
            <Title value={title} onChange={onTitleChange}/>
            <div className={classes.toolbarWrapper}>
                <div className={classes.presentationToolbar}>
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
                                customStyle={slideShowButtonStyle}
                        />
                    </div>
                    <div className={classes.slidesControls}>
                        <Button
                            text={'Добавить слайд'}
                            onClick={addSlide}
                            icon={addSlideIcon}
                        />
                        <Button
                            text={'Удалить слайд'}
                            onClick={removeSlide}
                            disabled={disabledSlideButton}
                            icon={deleteSlideIcon}
                        />
                        <Button
                            title={'Отменить'}
                            onClick={undo}
                            disabled={undoDisabled}
                            icon={undoIcon}
                        />
                        <Button
                            title={'Повторить'}
                            onClick={redo}
                            disabled={redoDisabled}
                            icon={redoIcon}
                        />
                    </div>
                </div>
                <div className={classes.elementToolbar}>
                    <div className={classes.layerControls}>
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
                    </div>
                    <div className={classes.elementControls}>
                        <Button
                            text={'Изменить фон'}
                            onClick={onShowBackgroundModal}
                            disabled={disabledSlideButton}
                            icon={backgroundIcon}
                        />
                        <Button
                            text={'Добавить текст'}
                            onClick={addTextElement}
                            disabled={disabledSlideButton}
                            icon={textAddIcon}
                        />
                        <DownloadImage disabled={disabledSlideButton}/>
                        <Button
                            text={'Unsplash'}
                            onClick={onOpenUnsplash}
                            disabled={disabledSlideButton}
                            icon={unsplashIcon}
                        />

                        <Button
                            text={'Удалить элемент'}
                            onClick={removeElement}
                            disabled={disabledElementButton}
                            icon={deleteIcon}
                        />
                        <TextEdit
                            slide={slide}
                            selectedElementId={selectedElementId}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export {TopPanel}