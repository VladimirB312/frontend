import classes from './LoadPresentation.module.css'
import {useRef} from "react";
import {dispatch} from "../../store/editor.ts";
import {loadPresentation} from "../../store/loadPresentation.ts";
import {EditorType} from "../../store/EditorType.ts";

export function LoadPresentation() {
    const inputRef = useRef<HTMLInputElement>(null)

    const handlePresentationChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {

        const file = event.target.files?.[0]
        if (inputRef.current) {
            inputRef.current.value = ''
        }

        if (!file) {
            return
        }

        const reader = new FileReader();

        reader.onload = e => {
            if (typeof e.target?.result === "string") {
                const data: EditorType | null = JSON.parse(e.target.result)
                if (!data) {
                    return
                }

                dispatch(loadPresentation,  data)
            }
        }

        reader.onerror = (e) => {
            console.error('Ошибка FileReader:', e);    // Обработка ошибки
        }

        reader.readAsText(file)

    }

    return (

        <div className={classes['load-presentation-input']}>
            <p>Загрузить презентацию</p>
            <input ref={inputRef}
                   type='file'
                   placeholder='Загрузить презентацию'
                   onChange={handlePresentationChange}/>
        </div>
    )
}

