import classes from './BackgroundChangeModal.module.css'
import {Background, ColorBackground, ImageBackground, Slide} from "../../store/objects.ts";
import {dispatch} from "../../store/editor.ts";
import {setBackground} from "../../store/setBackgroundColor.ts";
import Button from "../../components/Button/Button.tsx";
import React, {SetStateAction} from "react";

type BackgroundChangeModalProps = {
    slide: Slide | null,
    onClick: () => void,
    previewUserBackground: null | Background,
    setPreviewUserBackground: React.Dispatch<SetStateAction<Background | null>>
}

export function BackgroundChangeModal({
                                          slide,
                                          onClick,
                                          previewUserBackground,
                                          setPreviewUserBackground,
                                      }: BackgroundChangeModalProps) {
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
        if (previewUserBackground) {
            dispatch(setBackground, previewUserBackground)
        }
    }

    return (
        <div className={classes['modal-wrapper']}>
            <div className={classes['modal-window']}>
                <div>
                    <span>Выберите цвет фона</span>
                    <input type='color' value={selectedColor} onChange={handleColorChange}/>

                </div>
                <div>
                    <span>Выберите фоновое изображение</span>
                    <input type='file' onChange={handleImageChange}/>
                </div>
                <Button text='Закрыть' onClick={onClick}/>
                <Button text='Применить' onClick={onSave}/>
            </div>
        </div>
    )
}