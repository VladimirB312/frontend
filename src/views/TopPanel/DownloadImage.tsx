import classes from './DownloadImage.module.css'
import {useRef} from "react";
import {useAppActions} from "../hooks/useAppAction.ts";

type DownloadImageProps = {
    disabled: boolean
}

export function DownloadImage({disabled}: DownloadImageProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    const {addImageElement} = useAppActions()

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
            addImageElement(base64)
        })
    }

    return (

        <div className={classes['download-image-input']}>
                <p>Добавить изображение</p>
                <input disabled={disabled}
                    ref={inputRef}
                       type='file'
                       placeholder='Добавить изображение'
                       onChange={handleImageChange}/>
        </div>
    )
}

