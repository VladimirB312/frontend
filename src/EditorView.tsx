import classes from './EditorView.module.css'
import {TopPanel} from "./views/TopPanel/TopPanel.tsx";
import {SlideList} from "./views/SlideList/SlideList.tsx";
import {WorkArea} from "./views/WorkArea/WorkArea.tsx";
import {Background} from "./store/types.ts";
import React, {useState} from "react";
import {UnsplashWindow} from "./views/UnsplahWindow/UnsplashWindow.tsx";
import {createPortal} from "react-dom";
import {SlidesPreview} from "./views/SlidesPreview/SlidesPreview.tsx";
import {usePresentationSelector, useSelectionSelector} from "./views/hooks/useAppSelector.ts";
import {useUndoRedo} from "./views/hooks/useUndoRedo.ts";
import {BackgroundChangeModal} from "./views/BackgroundChangeModal/BackgroundChangeModal.tsx";
import {useDeleteObject} from "./views/hooks/useDeleteObject.ts";

const EditorView = () => {
    const presentation = usePresentationSelector()
    const selection = useSelectionSelector()

    const activeSlide = presentation.slides.find(
        slide => slide.id == selection?.activeSlideId
    ) ?? null

    const [previewUserBackground, setPreviewUserBackground] = useState<null | Background>(null)
    const [showBackgroundModal, setShowBackgroundModal] = React.useState(false)
    const [showUnsplash, setShowUnsplash] = useState(false)
    const [showPreviewSlides, setShowPreviewSlides] = useState(false)

    const {undoDisabled, redoDisabled} = useUndoRedo(showBackgroundModal, showUnsplash, showPreviewSlides)
    const selectedElementId = selection?.selectedElementId ?? null

    useDeleteObject(showBackgroundModal, showUnsplash, showPreviewSlides)

    return (
        <div>
            <TopPanel
                slide={activeSlide}
                selectedElementId={selectedElementId}
                previewUserBackground={previewUserBackground}
                undoDisabled={undoDisabled}
                redoDisabled={redoDisabled}
                setShowBackgroundModal={setShowBackgroundModal}
                setPreviewUserBackground={setPreviewUserBackground}
                setShowPreviewsSlides={setShowPreviewSlides}
                onOpenUnsplash={() => setShowUnsplash(true)}
            />
            <div className={classes.wrapper}>
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
            {showPreviewSlides && createPortal(
                <SlidesPreview
                    onClosePreview={() => setShowPreviewSlides(false)}
                />,
                document.body
            )}
            {showUnsplash && createPortal(
                <UnsplashWindow onCloseUnsplash={() => setShowUnsplash(false)}/>,
                document.body
            )}
            {showBackgroundModal && createPortal(
                <BackgroundChangeModal slide={activeSlide}
                                       previewUserBackground={previewUserBackground}
                                       setPreviewUserBackground={setPreviewUserBackground}
                                       onCloseBackgroundModal={() => setShowBackgroundModal(false)}/>,
                document.body
            )}
        </div>
    )
}

export default EditorView