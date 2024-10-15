import classes from './TopPanel.module.css'
import Button from "../../components/Button/Button.tsx";
import {renamePresentationTitle} from "../../store/renamePresentationTitle.ts";
import {dispatch} from "../../store/editor.ts";
import {removeSlide} from "../../store/removeSlide.ts";
import {addSlide} from "../../store/addSlide.ts";
import {Slide} from "../../store/objects.ts";
import {BackgroundChangeModal} from "../BackgroundChangeModal/BackgroundChangeModal.tsx";
import React from "react";

type TopPanelProps = {
    title: string,
    slide: Slide | null | undefined

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
        if (props.slide){
            setShowModal(true)
        }
    }

    const onCloseModal = () => {
        setShowModal(false)
    }

    return (
        <div className={classes['top-panel']}>
            <input className={classes['title']} type='text' defaultValue={props.title} onChange={onTitleChange}/>
            <div className={classes['toolbar']}>
                <Button text={'Добавить слайд'} onClick={onAddSlide}/>
                <Button text={'Удалить слайд'} onClick={onRemoveSlide}/>
                <Button text={'Изменить фон'} onClick={onShowModal}/>
                {showModal && <BackgroundChangeModal slide={props.slide} onClick={onCloseModal}/>}
            </div>
        </div>
    )
}

export default TopPanel;