import classes from './TopPanel.module.css'
import Button from "../../components/Button/Button.tsx";
import {renamePresentationTitle} from "../../store/renamePresentationTitle.ts";
import {dispatch} from "../../store/editor.ts";
import {removeSlide} from "../../store/removeSlide.ts";
import {addSlide} from "../../store/addSlide.ts";
import { Slide} from "../../store/objects.ts";
import {BackgroundChangeModal} from "../BackgroundChangeModal/BackgroundChangeModal.tsx";
import React from "react";
import {removeElement} from "../../store/removeElement.ts";
import {addTextElement} from "../../store/addElement.ts";
import {DownloadImage} from "./DownloadImage.tsx";

type TopPanelProps = {
    title: string,
    slide: Slide | null

}

function TopPanel(props: TopPanelProps) {

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
        if (props.slide) {
            setShowModal(true)
        }
    }

    const onCloseModal = () => {
        setShowModal(false)
    }

    const onRemoveElement = () => {
        dispatch(removeElement)
    }

    const onAddTextElement = () => {
        dispatch(addTextElement)
    }


    return (
        <div className={classes['top-panel']}>
            {showModal && <BackgroundChangeModal slide={props.slide} onClick={onCloseModal}/>}
            <input className={classes['title']} type='text' defaultValue={props.title} onChange={onTitleChange}/>
            <div className={classes['toolbar']}>
                <Button text={'Добавить слайд'} onClick={onAddSlide}/>
                <Button text={'Удалить слайд'} onClick={onRemoveSlide}/>
                <Button text={'Изменить фон'} onClick={onShowModal}/>
                <Button text={'Удалить элемент'} onClick={onRemoveElement}/>
                <Button text={'Добавить текст'} onClick={onAddTextElement}/>
                <DownloadImage />
            </div>
        </div>
    )
}

export default TopPanel;