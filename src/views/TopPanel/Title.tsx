import classes from "./TopPanel.module.css";
import React, {CSSProperties, useState} from "react";
import {useAppActions} from "../../hooks/useAppAction.ts";

type TitleProps = {
    value: string;
}

function Title({value}: TitleProps) {
    const [title, setTitle] = useState(value)
    const {renamePresentation} = useAppActions()

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleTitleBlur = () => {
        renamePresentation(title);
    }

    const inputStyle: CSSProperties = {
        width: `${(title.length + 1) * 9}px`
    }

    return (
        <input className={classes.title}
               type="text"
               defaultValue={title}
               onChange={handleTitleChange}
               onBlur={handleTitleBlur}
               style={inputStyle}
        />
    )
}

export {Title}