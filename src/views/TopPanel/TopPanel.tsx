import classes from './TopPanel.module.css'
import Button from "../../components/Button/Button.tsx";
import {Background, SlideType} from "../../store/types.ts";
import {BackgroundChangeModal} from "../BackgroundChangeModal/BackgroundChangeModal.tsx";
import React, {SetStateAction} from "react";
import {DownloadImage} from "./DownloadImage.tsx";
import {Title} from "./Title.tsx";
import {LoadPresentation} from "./LoadPresentation.tsx";
import {useAppActions} from "../hooks/useAppAction.ts";
import {useAppSelector} from "../hooks/useAppSelector.ts";

type TopPanelProps = {
    slide: SlideType | null,
    selectedElementId: string | null,
    previewUserBackground: null | Background,
    setPreviewUserBackground: React.Dispatch<SetStateAction<Background | null>>,
}

function TopPanel({
                      slide,
                      selectedElementId,
                      previewUserBackground,
                      setPreviewUserBackground,
                  }: TopPanelProps) {

    const [showModal, setShowModal] = React.useState(false);

    const editor = useAppSelector(editor => editor)
    const title = editor.presentation.title
    const {addSlide, removeSlide, renamePresentation, removeElement, addTextElement} = useAppActions()

    function onAddSlide() {
        addSlide()
    }

    function onRemoveSlide() {
        removeSlide()
    }

    const onTitleChange: React.ChangeEventHandler = (event) => {
        renamePresentation((event.target as HTMLInputElement).value);
    }

    const onShowModal = () => {
        if (slide) {
            setShowModal(true)
        }
    }

    const onCloseModal = () => {
        setShowModal(false)
        setPreviewUserBackground(null)
    }

    const onRemoveElement = () => {
        removeElement()
    }

    const onAddTextElement = () => {
        addTextElement()
    }

    const onSavePresentation = () => {
        const jsonEditor = JSON.stringify(editor.presentation)
        const file = new Blob([jsonEditor], {type: "application/json"})
        const a = document.createElement('a')
        a.href = URL.createObjectURL(file)
        a.download = `${title}.json`
        a.click()
        URL.revokeObjectURL(a.href)
    }

    const disabledSlideButton: boolean = !slide

    const disabledElementButton: boolean = !selectedElementId

    return (
        <div className={classes['top-panel']}>
            {showModal && <BackgroundChangeModal slide={slide}
                                                 previewUserBackground={previewUserBackground}
                                                 setPreviewUserBackground={setPreviewUserBackground}
                                                 onClick={onCloseModal}/>}
            <Title value={title} onChange={onTitleChange}/>
            <div className={classes['toolbar']}>
                <Button text={'Добавить слайд'} onClick={onAddSlide}/>
                <Button text={'Удалить слайд'} onClick={onRemoveSlide} disabled={disabledSlideButton}/>
                <Button text={'Изменить фон'} onClick={onShowModal} disabled={disabledSlideButton}/>
                <Button text={'Удалить элемент'} onClick={onRemoveElement} disabled={disabledElementButton}/>
                <Button text={'Добавить текст'} onClick={onAddTextElement} disabled={disabledSlideButton}/>
                <DownloadImage disabled={disabledSlideButton}/>
                <Button text={'Сохранить'} onClick={onSavePresentation}/>
                <LoadPresentation/>
            </div>
        </div>
    )
}

export default TopPanel;