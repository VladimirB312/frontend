import classes from './DownloadImage.module.css'
import {useRef} from "react";
import {useAppActions} from "../hooks/useAppAction.ts";
import {Size} from "../../store/types.ts";

type DownloadImageProps = {
    disabled: boolean
}

function DownloadImage({disabled}: DownloadImageProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    const {addImageElement} = useAppActions()

    function convertToBase64(file: File, onSuccess: (base64: string, size: Size) => void) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) =>  {
            const image = new Image()
            if (!e.target?.result || typeof e.target.result != "string") {
                return
            }

            image.src = e.target.result
            image.onload = () => {
                onSuccess(reader.result as string, {width: image.width, height: image.height})
            }
        }
    }

    const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0]
        if (inputRef.current) {
            inputRef.current.value = ''
        }

        if (!file) {
            return
        }

        convertToBase64(file, (base64: string, size: Size) => {
            addImageElement(base64, size)
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

export {DownloadImage}
