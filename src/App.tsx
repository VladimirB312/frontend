import classes from './App.module.css'
import TopPanel from "./views/TopPanel/TopPanel.tsx";
import SlideList from "./views/SlideList/SlideList.tsx";
import WorkArea from "./views/WorkArea/WorkArea.tsx";
import {Background} from "./store/types.ts";
import {useState} from "react";
import {useAppSelector} from "./views/hooks/useAppSelector.ts";
import {UnsplashWindow} from "./views/UnsplahWindow/UnsplashWindow.tsx";
import {createPortal} from "react-dom";
import SlidesPreview from "./views/SlidesPreview/SlidesPreview.tsx";

function App() {

    const editor = useAppSelector(state => state.present)

    const activeSlide = editor.presentation.slides.find(
        slide => slide.id == editor.selection?.activeSlideId
    ) ?? null ///

    const [previewUserBackground, setPreviewUserBackground] = useState<null | Background>(null)

    const [showUnsplash, setShowUnsplash] = useState(false)

    const [showPreviewSlides, setShowPreviewSlides] = useState(true)

    const selectedElementId = editor.selection?.selectedElementId ?? null

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