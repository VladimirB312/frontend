import classes from './TopPanel.module.css'
import {Button} from "../../components/Button/Button.tsx";
import {Background, SlideType} from "../../store/types.ts";
import React, {SetStateAction} from "react";
import {DownloadImage} from "./DownloadImage.tsx";
import {Title} from "./Title.tsx";
import {LoadPresentation} from "./LoadPresentation.tsx";
import {useAppActions} from "../hooks/useAppAction.ts";
import {usePresentationSelector} from "../hooks/useAppSelector.ts";
import {useNavigate} from "react-router";
import {
    addSlideIcon, backgroundIcon, deleteIcon,
    deleteSlideIcon,
    generatePdfIcon,
    redoIcon,
    saveIcon,
    slideShowIcon, textAddIcon,
    undoIcon, unsplashIcon
} from "../../components/icons.ts";

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

    const {addSlide, removeSlide, renamePresentation, removeElement, addTextElement, undo, redo} = useAppActions()

    const onAddSlide = () => {
        addSlide()
    }

    const onRemoveSlide = () => {
        removeSlide()
    }

    const onTitleChange: React.ChangeEventHandler = (event) => {
        renamePresentation((event.target as HTMLInputElement).value);
    }

    const onShowBackgroundModal = () => {
        if (slide) {
            setShowBackgroundModal(true)
        }
    }

    const onRemoveElement = () => {
        removeElement()
    }

    const onAddTextElement = () => {
        addTextElement()
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

    return (
        <div className={classes.topPanel}>
            <Title value={title} onChange={onTitleChange}/>
            <div className={classes.presentationToolbar}>
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
            <div className={classes.slidesToolbar}>
                <Button
                    text={'Добавить слайд'}
                    onClick={onAddSlide}
                    icon={addSlideIcon}
                />
                <Button
                    text={'Удалить слайд'}
                    onClick={onRemoveSlide}
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
                <Button
                    title={'Добавить текст'}
                    onClick={onAddTextElement}
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
                    title={'Сменить фон'}
                    onClick={onShowBackgroundModal}
                    disabled={disabledSlideButton}
                    icon={backgroundIcon}
                />
                <Button
                    text={'Удалить элемент'}
                    onClick={onRemoveElement}
                    disabled={disabledElementButton}
                    icon={deleteIcon}
                />
            </div>
        </div>
    )
}

export {TopPanel}