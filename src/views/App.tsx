import classes from './App.module.css'
import {maxDataPresentation} from "../store/test.ts";
import {Presentation} from "../store/objects.ts";
import WorkArea from "./WorkArea/WorkArea.tsx";
import {toolbarItems} from "../store/store.ts";
import TopPanel from "./TopPanel/TopPanel.tsx";

const presentation: Presentation = maxDataPresentation;

// const presentation = minDataPresentation;

function App() {
    return (
        <div className={classes['wrapper']}>
            <TopPanel toolbar={toolbarItems} title={presentation.title}/>
            <WorkArea slides={presentation.slides}/>
        </div>
    )
}

export default App