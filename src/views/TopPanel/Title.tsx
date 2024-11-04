import classes from "./TopPanel.module.css";

type TitleProps = {
    value: string;
    onChange: () => void;
}

export function Title({ value, onChange}: TitleProps): JSX.Element {
    return (
        <input className={classes["title"]}
               type="text" value={value}
               onChange={onChange}/>
    );
}