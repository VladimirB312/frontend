import classes from "./Title.module.css"
import React, {CSSProperties, useEffect, useRef, useState} from "react"
import {useAppActions} from "../../hooks/useAppAction.ts"

type TitleProps = {
    value: string,
}

function Title({value}: TitleProps) {
    const [title, setTitle] = useState(value)
    const {renamePresentation} = useAppActions()
    const titleBufferRef = useRef<HTMLDivElement>(null)
    const [inputWidth, setInputWidth] = useState(value.length * 9)
    const defaultTitle = 'Новая презентация'

    useEffect(() => {
        if (titleBufferRef.current) {
            setInputWidth(titleBufferRef.current.offsetWidth + 10)
        }
    }, [title])

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleTitleBlur = () => {
        if (!title.trim()) {
            renamePresentation(defaultTitle)
            setTitle(defaultTitle)
        } else {
            renamePresentation(title)
        }
    }

    const inputStyle: CSSProperties = {
        width: `${inputWidth}px`
    }

    return (
        <div>
            <input className={classes.title}
                   type="text"
                   value={title}
                   onChange={handleTitleChange}
                   onBlur={handleTitleBlur}
                   style={inputStyle}
            />
            <span
                ref={titleBufferRef}
                className={classes.titleBuffer}
            >
                {title || defaultTitle}
            </span>
        </div>

    )
}

export {Title}