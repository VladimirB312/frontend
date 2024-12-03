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
    const activeSlide = editor.presentation.slides.find(
        slide => slide.id == editor.selection?.activeSlideId
    ) ?? null ///

    const [previewUserBackground, setPreviewUserBackground] = useState<null | Background>(null)

    const selectedElementId = editor.selection?.selectedElementId ?? null

    return (
        <div>
            <TopPanel title={editor.presentation.title}
                      slide={activeSlide}
                      selectedElementId={selectedElementId}
                      previewUserBackground={previewUserBackground}
                      setPreviewUserBackground={setPreviewUserBackground}
                      editor={editor}
            />
            <div className={classes['wrapper']}>
                <SlideList slides={editor.presentation.slides}
                           selection={editor.selection}/>
                <WorkArea
                    slide={activeSlide
                        ? {
                            ...activeSlide,
                            background: previewUserBackground || activeSlide.background
                        }
                        : activeSlide
                    }
                    selectedElementId={selectedElementId}
                />
            </div>
        </div>
    )
}

export default App