import classes from './TextEditControls.module.css'
import {SlideType} from "../../store/types.ts"
import {useAppActions} from "../../hooks/useAppAction.ts"
import {alignCenterIcon, alignLeftIcon, alignRightIcon} from "../../components/icons.ts"
import {ChangeEvent} from "react"
import {ARIAL, HELVETICA, TAHOMA, TIMES_NEW_ROMAN, VERDANA} from "../../constants/fonts.ts"

type TextEditControlsProps = {
    slide: SlideType | null,
    selectedElementId: string | null,
}

const TextEditControls = ({slide, selectedElementId}: TextEditControlsProps) => {
    const {changeTextFont, changeTextSize, changeTextColor, changeTextAlign} = useAppActions()

    const element = slide?.objects.find(el => el.id == selectedElementId)

    if (!element || element.type != 'text') {
        return (
            <div className={classes.textEditBar}>
            </div>
        )
    }

    const handleFontChange = (e: ChangeEvent<HTMLSelectElement>) => {
        changeTextFont(e.target.value)
    }

    const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        changeTextSize(e.target.value)

    }

    const handleFontColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        changeTextColor(e.target.value)
    }

    const handleFontAlignChange = (dir: string) => {
        changeTextAlign(dir)
    }

    return (
        <div className={classes.textEditBar + ' ' + classes.textEditorBarVisible}>
            <form>
                <span className={classes.fontLabel}>Шрифт</span>
                <select
                    title='Шрифт'
                    value={element.font}
                    onChange={e => handleFontChange(e)}
                    className={classes.fontFamilySelector}
                >
                    <option disabled>Шрифт</option>
                    <option value={ARIAL}>Arial</option>
                    <option value={VERDANA}>Verdana</option>
                    <option value={HELVETICA}>Helvetica</option>
                    <option value={TAHOMA}>Tahoma</option>
                    <option value={TIMES_NEW_ROMAN}>Times New Roman</option>
                </select>
            </form>
            <form>
                <span className={classes.sizeLabel}>Размер</span>
                <select
                    title='Размер шрифта'
                    value={`${element.textSize}px`}
                    onChange={e => handleFontSizeChange(e)}
                    className={classes.fontSizeSelector}
                >
                    <option disabled>Размер</option>
                    <option value='8px'>8px</option>
                    <option value='12px'>12px</option>
                    <option value='16px'>16px</option>
                    <option value='20px'>20px</option>
                    <option value='24px'>24px</option>
                    <option value='30px'>30px</option>
                    <option value='36px'>36px</option>
                    <option value='48px'>48px</option>
                    <option value='60px'>60px</option>
                </select>
            </form>
            <div className={classes.colorPickerWrapper}>
                <span className={classes.colorLabel}>Цвет</span>
                <input
                    title='Цвет шрифта'
                    className={classes.colorPicker}
                    id='colorInput'
                    type='color'
                    value={element.color}
                    onChange={e => handleFontColorChange(e)}
                />
            </div>
            <div className={classes.alignControls}>
                <span className={classes.alignLabel}>Выравнивание</span>
                <button
                    title='По левому краю'
                    onClick={() => handleFontAlignChange('left')}
                    className={classes.alignButton}
                >
                    <img
                        src={alignLeftIcon}
                    >
                    </img>
                </button>
                <button
                    title='По центру'
                    onClick={() => handleFontAlignChange('center')}
                    className={classes.alignButton}
                >
                    <img
                        src={alignCenterIcon}
                    >
                    </img>
                </button>
                <button
                    title='По правому краю'
                    onClick={() => handleFontAlignChange('right')}
                    className={classes.alignButton}
                >
                    <img
                        src={alignRightIcon}
                    >
                    </img>
                </button>
            </div>
        </div>

    )
}

export {TextEditControls}