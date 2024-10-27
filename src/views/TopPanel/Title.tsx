import React from "react";
import classes from "./TopPanel.module.css";

export function Title(props: { value: string, onChange: React.ChangeEventHandler }) {
    return (
        <input className={classes["title"]}
               type="text" value={props.value}
               onChange={props.onChange}/>
    );
}