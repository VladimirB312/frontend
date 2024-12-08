import classes from "./TopPanel.module.css";
import React from "react";

type TitleProps = {
    value: string;
    onChange: React.ChangeEventHandler;
}

export function Title({ value, onChange}: TitleProps): JSX.Element {
    return (
        <input className={classes["title"]}
               type="text" value={value}
               onChange={onChange}/>
    );
}