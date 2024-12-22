import classes from './App.module.css'
import TopPanel from "./views/TopPanel/TopPanel.tsx";
import SlideList from "./views/SlideList/SlideList.tsx";
import WorkArea from "./views/WorkArea/WorkArea.tsx";
import {Background} from "./store/types.ts";
import {useState} from "react";
import {UnsplashWindow} from "./views/UnsplahWindow/UnsplashWindow.tsx";
import {createPortal} from "react-dom";
import SlidesPreview from "./views/SlidesPreview/SlidesPreview.tsx";
import {usePresentationSelector, useSelectionSelector} from "./views/hooks/useAppSelector.ts";
import {useUndoRedo} from "./views/hooks/useUndoRedo.ts";

function App() {

    const presentation = usePresentationSelector()
    const selection = useSelectionSelector()

    const activeSlide = presentation.slides.find(
        slide => slide.id == selection?.activeSlideId
    ) ?? null ///

    const [previewUserBackground, setPreviewUserBackground] = useState<null | Background>(null)

    const [showUnsplash, setShowUnsplash] = useState(false)

    const [showPreviewSlides, setShowPreviewSlides] = useState(true)

    const {undoDisabled, redoDisabled} = useUndoRedo()

    const selectedElementId = selection?.selectedElementId ?? null

    return (
        <div>
            {showPreviewSlides && createPortal(
                <SlidesPreview onClosePreview={() => setShowPreviewSlides(false)}/>,
                document.body
            )}
            <TopPanel
                slide={activeSlide}
                selectedElementId={selectedElementId}
                previewUserBackground={previewUserBackground}
                undoDisabled={undoDisabled}
                redoDisabled={redoDisabled}
                setPreviewUserBackground={setPreviewUserBackground}
                onOpenUnsplash={() => setShowUnsplash(true)}
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
            {showUnsplash && createPortal(
                <UnsplashWindow onCloseUnsplash={() => setShowUnsplash(false)}/>,
                document.body
            )}
        </div>
    )
}

export default App