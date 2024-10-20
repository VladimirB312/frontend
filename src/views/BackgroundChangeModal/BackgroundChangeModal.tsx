import classes from './BackgroundChangeModal.module.css'
import {ColorBackground, ImageBackground, Slide} from "../../store/objects.ts";
import {dispatch} from "../../store/editor.ts";
import {setBackgroundColor, setBackgroundImage} from "../../store/setBackgroundColor.ts";
import Button from "../../components/Button/Button.tsx";

type BackgroundChangeModalProps = {
    slide: Slide | null,
    onClick: () => void,
}

export function BackgroundChangeModal(props: BackgroundChangeModalProps) {
    if (!props.slide) {
        return <p>Цвет фона</p>
    }
    let selectedColor = props.slide.background.type == 'solid' ? props.slide.background.color : '#ffffff'

    if (props.slide.background.type == 'solid') {
        selectedColor = props.slide.background.color
    }

    const handleColorChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const newBackgroundColor: ColorBackground = {
            type: 'solid',
            color: (event.target as HTMLInputElement).value,
        }

        dispatch(setBackgroundColor, newBackgroundColor)
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
            dispatch(setBackgroundImage, newBackgroundImage)
        })

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
                <Button text='Закрыть' onClick={props.onClick}/>
            </div>
        </div>
    )
}