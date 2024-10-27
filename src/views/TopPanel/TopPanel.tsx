import classes from './TopPanel.module.css'
import Button from "../../components/Button/Button.tsx";
import {renamePresentationTitle} from "../../store/renamePresentationTitle.ts";
import {dispatch} from "../../store/editor.ts";
import {removeSlide} from "../../store/removeSlide.ts";
import {addSlide} from "../../store/addSlide.ts";
import {Background, Slide} from "../../store/objects.ts";
import {BackgroundChangeModal} from "../BackgroundChangeModal/BackgroundChangeModal.tsx";
import React, {SetStateAction} from "react";
import {removeElement} from "../../store/removeElement.ts";
import {addTextElement} from "../../store/addElement.ts";
import {DownloadImage} from "./DownloadImage.tsx";
import {Title} from "./Title.tsx";

type TopPanelProps = {
    title: string,
    slide: Slide | null,
    selectedElementId: string | null,
    previewUserBackground: null | Background,
    setPreviewUserBackground: React.Dispatch<SetStateAction<Background | null>>
}

function TopPanel({
                      title,
                      slide,
                      selectedElementId,
                      previewUserBackground,
                      setPreviewUserBackground,
                  }: TopPanelProps) {

    const [showModal, setShowModal] = React.useState(false);

    function onAddSlide() {
        dispatch(addSlide)
    }

    function onRemoveSlide() {
        dispatch(removeSlide)
    }

    const onTitleChange: React.ChangeEventHandler = (event) => {
        dispatch(renamePresentationTitle, (event.target as HTMLInputElement).value);
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
        dispatch(removeElement)
    }

    const onAddTextElement = () => {
        dispatch(addTextElement)
    }

    const disabledSlideButton: boolean = !slide;

    const disabledElementButton: boolean = !selectedElementId;

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
            </div>
        </div>
    )
}

export default TopPanel;