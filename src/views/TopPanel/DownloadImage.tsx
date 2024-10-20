import classes from './DownloadImage.module.css'
import {dispatch} from "../../store/editor.ts";
import {addImageElement} from "../../store/addElement.ts";
import {useRef} from "react";

export function DownloadImage() {
    const inputRef = useRef<HTMLInputElement>(null)

    function convertToBase64(file: File, onSuccess: (base64: string) => void) {
        const reader = new FileReader()
        reader.onload = () => onSuccess(reader.result as string)
        reader.readAsDataURL(file)
    }

    const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {

        const file = event.target.files?.[0]
        if (inputRef.current) {
            inputRef.current.value = ''
        }

        if (!file) {
            return
        }

        convertToBase64(file, (base64: string) => {
            dispatch(addImageElement, {src: base64})
        })
    }

    return (

        <div className={classes['download-image-input']}>
                <p>Добавить изображение</p>
                <input ref={inputRef}
                       type='file'
                       placeholder='Добавить изображение'
                       onChange={handleImageChange}/>
        </div>
    )
}

