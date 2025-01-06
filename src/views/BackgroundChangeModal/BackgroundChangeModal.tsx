import classes from './BackgroundChangeModal.module.css'
import {Background, ColorBackground, ImageBackground, SlideType} from "../../store/types.ts";
import {Button} from "../../components/Button/Button.tsx";
import React, {SetStateAction} from "react";
import {useAppActions} from "../hooks/useAppAction.ts";

type BackgroundChangeModalProps = {
    slide: SlideType | null,
    onCloseBackgroundModal: () => void,
    previewUserBackground: null | Background,
    setPreviewUserBackground: React.Dispatch<SetStateAction<Background | null>>,
}

const BackgroundChangeModal = ({
                                   slide,
                                   onCloseBackgroundModal,
                                   previewUserBackground,
                                   setPreviewUserBackground,
                               }: BackgroundChangeModalProps) => {

    const {setBackgroundColor, setBackgroundImage} = useAppActions()

    if (!slide) {
        return <p>Цвет фона</p>
    }

    let selectedColor = slide.background.type == 'solid' ? slide.background.color : '#ffffff'

    if (slide.background.type == 'solid') {
        selectedColor = slide.background.color
    }

    const handleColorChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const newBackgroundColor: ColorBackground = {
            type: 'solid',
            color: (event.target as HTMLInputElement).value,
        }
        setPreviewUserBackground(newBackgroundColor)
    }

    function convertToBase64(file: File, onSuccess: (base64: string) => void) {
        const reader = new FileReader()
        reader.onload = () => onSuccess(reader.result as string)
        reader.readAsDataURL(file)
    }

    const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return
        }

        convertToBase64(file, (base64: string) => {
            const newBackgroundImage: ImageBackground = {
                type: 'image',
                src: base64,
            }
            setPreviewUserBackground(newBackgroundImage)
        })
    }

    const onSave = () => {
        if (!previewUserBackground) {
            return
        }
        if (previewUserBackground.type == "solid") {
            setBackgroundColor(previewUserBackground)
        }
        if (previewUserBackground.type == "image") {
            setBackgroundImage(previewUserBackground)
        }
    }

    const onClose = () => {
        setPreviewUserBackground(null)
        onCloseBackgroundModal()
    }

    return (
        <div className={classes.modalWrapper}>
            <div className={classes.modalWindow}>
                <div>
                    <span>Выберите цвет фона</span>
                    <input type='color' value={selectedColor} onChange={handleColorChange}/>

                </div>
                <div>
                    <span>Выберите фоновое изображение</span>
                    <input type='file' onChange={handleImageChange}/>
                </div>
                <div>
                    Выберите градиент
                </div>
                <div className={classes.controlButtons}>
                    <Button text='Закрыть' onClick={onClose}/>
                    <Button text='Применить' onClick={onSave}/>
                </div>
            </div>
        </div>
    )
}

export {BackgroundChangeModal}