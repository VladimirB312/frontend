import classes from './LoadPresentation.module.css'
import React, {useRef} from "react"
import {useAppActions} from "../../../hooks/useAppAction.ts"
import {PresentationType} from "../../../store/types.ts"
import {loadIcon} from "../../../components/icons.ts"
import {validatePresentation} from "../../../utils/ajvValidator.ts"

const LoadPresentation = () => {
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

        const reader = new FileReader()

        reader.onload = e => {
            try {
                if (typeof e.target?.result === "string") {
                    const data: PresentationType = JSON.parse(e.target.result)
                    const isValid = validatePresentation(data)
                    if (!isValid) {
                        return
                    }

                    loadPresentation(data)
                } else {
                    alert('Ошибка при загрузке презентации.')
                    return
                }
            } catch (error) {
                console.log(error)
                alert('Ошибка при загрузке презентации.')
            }
        }

        reader.onerror = (e) => {
            console.error('Ошибка FileReader:', e)
        }

        reader.readAsText(file)

    }

    return (
        <div className={classes.button}>
            <label
                className={classes.label}
                htmlFor='loadPresentationInput'
            >
                <img className={classes.img}
                     src={loadIcon}>
                </img>
                Загрузить
            </label>
            <input className={classes.input}
                   id='loadPresentationInput'
                   ref={inputRef}
                   type='file'
                   placeholder='Загрузить презентацию'
                   onChange={handlePresentationChange}/>
        </div>
    )
}

export {LoadPresentation}
