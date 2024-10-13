import PresentationTitle from "../PresentationTitle/PresentationTitle.tsx";
import Toolbar from "../Menu/Toolbar.tsx";
import {ToolbarItem} from "../../store/objects.ts";
import classes from './TopPanel.module.css'

type TopPanelProps = {
    title: string,
    toolbar: Array<ToolbarItem>
}

function TopPanel(props: TopPanelProps) {
    return (
        <div className={classes['top-panel']}>
            <PresentationTitle title={props.title}/>
            <Toolbar toolbar={props.toolbar}/>
        </div>
    )
}

export default TopPanel;