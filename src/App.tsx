import classes from './App.module.css'
import TopPanel from "./views/TopPanel/TopPanel.tsx";
import SlideList from "./views/SlideList/SlideList.tsx";
import WorkArea from "./views/WorkArea/WorkArea.tsx";
import {EditorType} from "./store/EditorType.ts";

type AppProps = {
    editor: EditorType,
}

function App({editor}: AppProps) {
    const slide =
        editor.selection
            ? editor.presentation.slides.find(
                slide => slide.id == editor.selection?.selectedSlideId)
            : null

    return (
        <>
            <TopPanel title={editor.presentation.title}
                      slide={slide}
            />
            <div className={classes['wrapper']}>
                <SlideList slides={editor.presentation.slides}
                           selection={editor.selection}/>
                <WorkArea slide={slide}/>
            </div>
        </>
    )
}

export default App