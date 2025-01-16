import classes from './BackgroundChangeModal.module.css'
import {Background, ImageBackground, SlideType} from "../../store/types.ts";
import {Button} from "../../components/Button/Button.tsx";
import React, {SetStateAction, useRef} from "react";
import {useAppActions} from "../../hooks/useAppAction.ts";
import {applyIcon, closeIcon, photoAddIcon} from "../../components/icons.ts";
import {ColorPicker} from "./ColorPicker.tsx";

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

    const {setBackgroundColor, setBackgroundImage, setBackgroundGradient} = useAppActions()
    const inputRef = useRef<HTMLInputElement>(null)

    if (!slide) {
        return <p>Цвет фона</p>
    }

    function convertToBase64(file: File, onSuccess: (base64: string) => void) {
        const reader = new FileReader()
        reader.onload = () => onSuccess(reader.result as string)
        reader.readAsDataURL(file)
    }

    const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0];
        if (inputRef.current) {
            inputRef.current.value = ''
        }

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
        
        if (previewUserBackground.type == 'gradient') {
            setBackgroundGradient(previewUserBackground)
        }
    }

    const onClose = () => {
        setPreviewUserBackground(null)
        onCloseBackgroundModal()
    }

    return (
        <div className={classes.modalWrapper}>
            <div className={classes.modalWindow}>
                <ColorPicker
                    slide={slide}
                    previewUserBackground={previewUserBackground}
                    setPreviewUserBackground={setPreviewUserBackground}
                />
                <div className={classes.imageInputWrapper}>
                    <label
                        className={classes.labelForImageInput}
                        htmlFor='imageInput'
                    >
                        <img
                            className={classes.iconForImageInput}
                            src={photoAddIcon}>
                        </img>
                        Выбрать фоновое изображение
                    </label>
                    <input
                        ref={inputRef}
                        className={classes.imageInput}
                        id='imageInput'
                        type='file'
                        onChange={handleImageChange}
                    />
                </div>
                <div className={classes.controlButtons}>
                    <Button
                        icon={closeIcon}
                        text='Закрыть'
                        onClick={onClose}
                    />
                    <Button
                        icon={applyIcon}
                        text='Применить'
                        onClick={onSave}
                    />
                </div>
            </div>
        </div>
    )
}

export {BackgroundChangeModal}