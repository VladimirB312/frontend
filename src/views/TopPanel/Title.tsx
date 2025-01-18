import classes from "./TopPanel.module.css";
import React, {useState} from "react";
import {useAppActions} from "../../hooks/useAppAction.ts";

type TitleProps = {
    value: string;
}

function Title({ value}: TitleProps) {
    const [title, setTitle] = useState(value)
    const {renamePresentation} = useAppActions()

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleTitleBlur = () => {
        renamePresentation(title);
    }

    return (
        <input className={classes.title}
               type="text"
               defaultValue={title}
               onChange={handleTitleChange}
               onBlur={handleTitleBlur}
        />
    );
}

export {Title}