import classes from './TextEdit.module.css'
import {SlideType} from "../../store/types.ts";
import {useAppActions} from "../hooks/useAppAction.ts";
import React from "react";
import {alignCenterIcon, alignLeftIcon, alignRightIcon} from "../../components/icons.ts";

type TextEditProps = {
    slide: SlideType | null,
    selectedElementId: string | null,
}

const TextEdit = ({slide, selectedElementId}: TextEditProps) => {
    const {changeTextFont, changeTextSize, changeTextColor, changeTextAlign} = useAppActions()

    const element = slide?.objects.find(el => el.id == selectedElementId)

    if (!element || element.type != 'text') {
        return (
            <div className={classes.textEditBar}>
            </div>
        )
    }

    const handleFontChange = (e) => {
        changeTextFont(e.target.value)
    }

    const handleFontSizeChange = (e) => {
        changeTextSize(e.target.value)

    }

    const handleFontColorChange = (e) => {
        changeTextColor(e.target.value)
    }

    const handleFontAlignChange = (dir: string) => {
        changeTextAlign(dir)
    }

    return (
        <div className={classes.textEditBar + ' ' + classes.textEditorBarVisible}>
            <form>
                <select
                    value={element.font}
                    onChange={e => handleFontChange(e)}
                    className={classes.fontFamilySelector}
                >
                    <option disabled>Шрифт</option>
                    <option value='Arial, sans-serif'>Arial</option>
                    <option value='Verdana, sans-serif'>Verdana</option>
                    <option value='Helvetica, sans-serif'>Helvetica</option>
                    <option value='Tahoma, sans-serif'>Tahoma</option>
                    <option value='Times New Roman, serif'>Times New Roman</option>
                </select>
            </form>
            <form>
                <select
                    value={`${element.textSize}px`}
                    onChange={e => handleFontSizeChange(e)}
                    className={classes.fontSizeSelector}
                >
                    <option disabled>Размер</option>
                    <option value='12px'>12px</option>
                    <option value='16px'>16px</option>
                    <option value='20px'>20px</option>
                    <option value='24px'>24px</option>
                    <option value='30px'>30px</option>
                </select>
            </form>
            <div className={classes.colorPickerWrapper}>
                <input
                    className={classes.colorPicker}
                    id='colorInput'
                    type='color'
                    value={element.color}
                    onChange={e => handleFontColorChange(e)}
                />
            </div>
            <button
                onClick={() => handleFontAlignChange('left')}
                className={classes.alignButton}
            >
                <img
                    src={alignLeftIcon}
                >
                </img>
            </button>
            <button
                onClick={() => handleFontAlignChange('center')}
                className={classes.alignButton}
            >
                <img
                    src={alignCenterIcon}
                >
                </img>
            </button>
            <button
                onClick={() => handleFontAlignChange('right')}
                className={classes.alignButton}
            >
                <img
                    src={alignRightIcon}
                >
                </img>
            </button>
        </div>

    )
}

export {TextEdit}