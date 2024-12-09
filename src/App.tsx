import classes from './App.module.css'
import TopPanel from "./views/TopPanel/TopPanel.tsx";
import SlideList from "./views/SlideList/SlideList.tsx";
import WorkArea from "./views/WorkArea/WorkArea.tsx";
import {Background} from "./store/types.ts";
import {useState} from "react";
import {useAppSelector} from "./views/hooks/useAppSelector.ts";

function App() {

    const editor = useAppSelector(state => state.present)

    const activeSlide = editor.presentation.slides.find(
        slide => slide.id == editor.selection?.activeSlideId
    ) ?? null ///

    const [previewUserBackground, setPreviewUserBackground] = useState<null | Background>(null)

    const selectedElementId = editor.selection?.selectedElementId ?? null

    return (
        <div>
                <TopPanel
                    slide={activeSlide}
                    selectedElementId={selectedElementId}
                    previewUserBackground={previewUserBackground}
                    setPreviewUserBackground={setPreviewUserBackground}
                />
                <div className={classes['wrapper']}>
                    <SlideList/>
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