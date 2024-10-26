import classes from './App.module.css'
import TopPanel from "./views/TopPanel/TopPanel.tsx";
import SlideList from "./views/SlideList/SlideList.tsx";
import WorkArea from "./views/WorkArea/WorkArea.tsx";
import {EditorType} from "./store/EditorType.ts";
import {Background} from "./store/objects.ts";
import {useState} from "react";

type AppProps = {
    editor: EditorType,
}

function App({editor}: AppProps) {
    const slide = editor.presentation.slides.find(
        slide => slide.id == editor.selection?.selectedSlideId
    ) ?? null ///
    const [previewUserBackground, setPreviewUserBackground] = useState<null | Background>(null)

    const selectedElementId = editor.selection?.selectedElementId ?? null

    return (
        <div>
            <TopPanel title={editor.presentation.title}
                      slide={slide}
            />
            <div className={classes['wrapper']}>
                <SlideList slides={editor.presentation.slides}
                           selection={editor.selection}/>
                <WorkArea
                    slide={slide
                        ? {
                            ...slide,
                            background: previewUserBackground || slide.background
                        }
                        : slide
                    }
                    selectedElementId={selectedElementId}
                />
            </div>
        </div>
    )
}

export default App