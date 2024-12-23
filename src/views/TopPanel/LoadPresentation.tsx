import classes from './LoadPresentation.module.css'
import {useRef} from "react";
import {useAppActions} from "../hooks/useAppAction.ts";
import {PresentationType} from "../../store/types.ts";

function LoadPresentation() {
    const inputRef = useRef<HTMLInputElement>(null)
    const {loadPresentation} = useAppActions()

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
                const data: PresentationType | null = JSON.parse(e.target.result)
                if (!data) {
                    return
                }

                loadPresentation(data)
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

export {LoadPresentation}

