import classes from './ColorPicker.module.css'
import React, {ChangeEvent, SetStateAction, useEffect, useState} from "react";
import {Background, ColorBackground, GradientBackground, GradientDirection, SlideType} from "../../store/types.ts";

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
            : slide?.background.color1
        : '#FFFFFF')

    const [colorTwo, setColorTwo] = useState(slide?.background.type != 'image'
        ? slide?.background.type == 'solid'
            ? null
            : slide?.background.color2
        : null)

    const [gradientDirection, setGradientDirection] = useState<GradientDirection>(slide?.background.type != 'gradient'
        ? 'none'
        : slide.background.direction)

    useEffect(()=> {
        if (previewUserBackground && previewUserBackground.type == 'image') {
            setColorOne('#FFFFFF')
            setColorTwo(null)
            setGradientDirection('none')
        }
    }, [previewUserBackground])

    const onChangeGradient = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newGradientDirection = e.target.value as GradientDirection
        setGradientDirection(newGradientDirection)

        if (!colorOne) {
            return
        }

        if (newGradientDirection == 'none') {
            setColorTwo(null)
            const newBackgroundColor: ColorBackground = {
                type: 'solid',
                color: colorOne,
            }
            setPreviewUserBackground(newBackgroundColor)

            return
        }

        setColorTwo(colorTwo ? colorTwo : '#FFFFFF')
        const newBackgroundGradient: GradientBackground = {
            type: 'gradient',
            direction: newGradientDirection,
            color1: colorOne,
            color2: colorTwo ? colorTwo : '#FFFFFF',
        }
        setPreviewUserBackground(newBackgroundGradient)

    }

    const onChangeColorOne = (e: ChangeEvent<HTMLInputElement>) => {
        const newColorOne = e.target.value

        setColorOne(newColorOne)

        if (!gradientDirection) {
            return
        }

        if (gradientDirection == 'none') {
            const newBackgroundColor: ColorBackground = {
                type: 'solid',
                color: newColorOne,
            }
            setPreviewUserBackground(newBackgroundColor)
            return
        }

        const newBackgroundGradient: GradientBackground = {
            type: 'gradient',
            direction: gradientDirection,
            color1: newColorOne,
            color2: colorTwo ? colorTwo : '#FFFFFF',
        }
        setPreviewUserBackground(newBackgroundGradient)
    }

    const onChangeColorTwo = (e: ChangeEvent<HTMLInputElement>) => {
        const newColorTwo = e.target.value
        setColorTwo(newColorTwo)
        const newBackgroundGradient: GradientBackground = {
            type: 'gradient',
            direction: gradientDirection,
            color1: colorOne ? colorOne : '#FFFFFF',
            color2: newColorTwo,
        }
        setPreviewUserBackground(newBackgroundGradient)
    }

    return (
        <div className={classes.colorPicker}>
            <div className={classes.gradientSelectorWrapper}>
                <span>Градиент</span>
                <form>
                    <select
                        className={classes.gradientSelector}
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
            <div className={classes.selectorsWrapper}>
                <span className={classes.colorSelectorsLabel}>Цвет</span>
                <div className={classes.inputWrapper}>
                    <input
                        className={classes.colorSelector}
                        onChange={e => onChangeColorOne(e)}
                        type="color"
                        value={colorOne}
                    />
                    {colorTwo &&
                        <input
                            className={classes.colorSelector}
                            onChange={e => onChangeColorTwo(e)}
                            type="color"
                            value={colorTwo}
                        />}
                </div>
            </div>
        </div>
    )
}

export {ColorPicker}