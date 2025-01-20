import classes from './BackgroundChangeModal.module.css'
import {Background, ImageBackground, SlideType} from "../../store/types.ts";
import {Button} from "../../components/Button/Button.tsx";
import React, {SetStateAction, useEffect, useRef} from "react";
import {useAppActions} from "../../hooks/useAppAction.ts";
import {closeIcon, photoAddIcon} from "../../components/icons.ts";
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

    const {setBackgroundColor, setBackgroundImage, setBackgroundGradient, setAllSlidesBackground} = useAppActions()
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!previewUserBackground && slide)
        setPreviewUserBackground(slide.background) 
    }, [previewUserBackground, setPreviewUserBackground, slide]);
    
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

    const onApply = () => {
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

        setPreviewUserBackground(null)
        onCloseBackgroundModal()
    }

    const onApplyAll = () => {
        if (!previewUserBackground) {
            return
        }

        setAllSlidesBackground(previewUserBackground)
        setPreviewUserBackground(null)
        onCloseBackgroundModal()
    }

    const onClose = () => {
        setPreviewUserBackground(null)
        onCloseBackgroundModal()
    }

    return (
        <div className={classes.modalWrapper}>
            <div className={classes.modalWindow}>
                <div className={classes.windowHeader}>
                    <span className={classes.windowLabel}>Фон</span>
                    <Button
                        icon={closeIcon}
                        text='Закрыть'
                        onClick={onClose}
                        className={classes.closeButton}
                    />
                </div>
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
                        Выбрать фоновое изображение
                        <img
                            className={classes.iconForImageInput}
                            src={photoAddIcon}>
                        </img>
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
                        text='Применить ко всем'
                        onClick={onApplyAll}
                        className={classes.applyAllButton}
                    />
                    <Button
                        text='Применить'
                        onClick={onApply}
                        className={classes.applyButton}
                        hoverClassName={classes.applyButtonHover}
                    />
                </div>
            </div>
        </div>
    )
}

export {BackgroundChangeModal}