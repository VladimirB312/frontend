import classes from './BackgroundChangeModal.module.css'
import {Background, ColorBackground, ImageBackground, SlideType} from "../../store/types.ts";
import {Button} from "../../components/Button/Button.tsx";
import React, {SetStateAction, useEffect, useState} from "react";
import {useAppActions} from "../hooks/useAppAction.ts";
import {applyIcon, closeIcon, photoAddIcon} from "../../components/icons.ts";
import {setBackgroundGradient} from "../../store/slideFunctions.ts";

type BackgroundChangeModalProps = {
    slide: SlideType | null,
    onCloseBackgroundModal: () => void,
    previewUserBackground: null | Background,
    setPreviewUserBackground: React.Dispatch<SetStateAction<Background | null>>,
}

type ColorPickerProps = {
    slide: SlideType | null,
    previewUserBackground: null | Background,
    setPreviewUserBackground: React.Dispatch<SetStateAction<Background | null>>,
}

const ColorPicker = ({
                         slide,
                         previewUserBackground,
                         setPreviewUserBackground,
                     }: ColorPickerProps) => {

    const [colorOne, setColorOne] = useState(slide?.background.type != 'image'
        ? slide?.background.type == 'solid'
            ? slide.background.color
            : slide.background.color1
        : '#FFFFFF')

    const [colorTwo, setColorTwo] = useState(slide?.background.type != 'image'
        ? slide?.background.type == 'solid'
            ? null
            : slide.background.color2
        : '#FFFFFF')

    const [gradientDirection, setGradientDirection] = useState(slide?.background.type != 'gradient'
        ? 'none'
        : slide.background.direction)

    const onChangeGradient = (e) => {
        const newGradientDirection = e.target.value
        setGradientDirection(newGradientDirection)
        if (newGradientDirection == 'none') {
            setColorTwo(null)
            const newBackgroundColor: ColorBackground = {
                type: 'solid',
                color: colorOne,
            }
            setPreviewUserBackground(newBackgroundColor)
        } else {
            setColorTwo(colorTwo ? colorTwo : '#FFFFFF')
            const newBackgroundGradient: GradientBackground = {
                type: 'gradient',
                direction: newGradientDirection,
                color1: colorOne,
                color2: colorTwo ? colorTwo : '#FFFFFF',
            }
            setPreviewUserBackground(newBackgroundGradient)
        }
    }

    const onChangeColorOne = (e) => {
        const newColorOne = e.target.value

        setColorOne(newColorOne)
        if (gradientDirection == 'none') {
            const newBackgroundColor: ColorBackground = {
                type: 'solid',
                color: newColorOne,
            }
            setPreviewUserBackground(newBackgroundColor)
        } else {
            const newBackgroundGradient: GradientBackground = {
                type: 'gradient',
                direction: gradientDirection,
                color1: newColorOne,
                color2: colorTwo,
            }
            setPreviewUserBackground(newBackgroundGradient)
        }
    }

    const onChangeColorTwo = (e) => {
        const newColorTwo = e.target.value
        setColorTwo(newColorTwo)
        const newBackgroundGradient: GradientBackground = {
            type: 'gradient',
            direction: gradientDirection,
            color1: colorOne,
            color2: newColorTwo,
        }
        setPreviewUserBackground(newBackgroundGradient)
    }

    return (
        <div>
            <div>
                <div>
                    <p>Градиент</p>
                    <form>
                        <select
                            onChange={e => onChangeGradient(e)}
                            value={gradientDirection}
                        >
                            <option value='none'>none</option>
                            <option value='to top'>Top</option>
                            <option value='to right top'>Right top</option>
                            <option value='to right'>Right</option>
                            <option value='to right bottom'>Right bottom</option>
                            <option value='to bottom'>Bottom</option>
                            <option value='to left bottom'>Left bottom</option>
                            <option value='to left'>Left</option>
                            <option value='to left top'>Left top</option>
                        </select>
                    </form>
                </div>

                <div>
                    <p>Выберите цвет</p>

                    <div>
                        <input
                            onChange={e => onChangeColorOne(e)}
                            type="color"
                            value={colorOne}
                        />
                        {colorTwo &&
                            <input
                                onChange={e => onChangeColorTwo(e)}
                                type="color"
                                value={colorTwo}
                            />}
                    </div>
                </div>
            </div>
        </div>
    )
}

const BackgroundChangeModal = ({
                                   slide,
                                   onCloseBackgroundModal,
                                   previewUserBackground,
                                   setPreviewUserBackground,
                               }: BackgroundChangeModalProps) => {

    const {setBackgroundColor, setBackgroundImage, setBackgroundGradient} = useAppActions()

    if (!slide) {
        return <p>Цвет фона</p>
    }

    const selectedColor = slide.background.type == 'solid' ? slide.background.color : '#ffffff'

    // if (slide.background.type == 'solid') {
    //     selectedColor = slide.background.color
    // }

    // if (previewUserBackground && previewUserBackground.type == 'solid') {
    //     selectedColor = previewUserBackground.color
    // }

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
                <div>
                    <input
                        className={classes.inputForColor}
                        id='colorInput'
                        type='color'
                        value={selectedColor}
                        onChange={handleColorChange}
                    />
                    <label
                        className={classes.labelForColorInput}
                        htmlFor='colorInput'
                    >
                        Выбрать цвет фона
                    </label>
                </div>
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
                        className={classes.imageInput}
                        id='imageInput'
                        type='file'
                        onChange={handleImageChange}
                    />
                </div>
                <ColorPicker
                    slide={slide}
                    previewUserBackground={previewUserBackground}
                    setPreviewUserBackground={setPreviewUserBackground}
                />

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