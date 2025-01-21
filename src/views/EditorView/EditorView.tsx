import classes from './EditorView.module.css'
import {TopPanel} from "../TopPanel/TopPanel.tsx"
import {SlideList} from "../SlideList/SlideList.tsx"
import {WorkArea} from "../WorkArea/WorkArea.tsx"
import {Background, ImageElement, SlideType, TextElement} from "../../store/types.ts"
import React, {useEffect, useState} from "react"
import {UnsplashWindow} from "../UnsplahWindow/UnsplashWindow.tsx"
import {createPortal} from "react-dom"
import {SlidesPreview} from "../SlidesPreview/SlidesPreview.tsx"
import {usePresentationSelector, useSelectionSelector} from "../../hooks/useAppSelector.ts"
import {useUndoRedo} from "../../hooks/useUndoRedo.ts"
import {BackgroundChangeModal} from "../BackgroundChangeModal/BackgroundChangeModal.tsx"
import {useDelete} from "../../hooks/useDelete.ts"
import {SideBar} from "../SideBar/SideBar.tsx"
import {useAppActions} from "../../hooks/useAppAction.ts"

const useCopyPasteElement = (activeSlide: SlideType | null, selectedElementId: string | null) => {
    const [elementBuffer, setElementBuffer] = useState<TextElement | ImageElement | null>(null)

    const {pasteElement} = useAppActions()
    
    useEffect(() => {
        const onCopy = () => {
            if (activeSlide && selectedElementId) {
                const selectedElement = activeSlide.objects.find(
                    element => element.id == selectedElementId
                )
                if (selectedElement) {
                    setElementBuffer(selectedElement)   
                }                
            }
        }

        const onPaste = () => {
            if (!elementBuffer || !activeSlide) {
                return
            }
            
            pasteElement(elementBuffer)
        }
        
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code == 'KeyC' && (e.altKey)) {
                onCopy()
            }

            if (e.code == 'KeyV' && (e.altKey)) {
                onPaste()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [activeSlide, elementBuffer, pasteElement, selectedElementId])
}

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
    const [textEditMode, setTextEditMode] = useState(false)

    const {undoDisabled, redoDisabled} = useUndoRedo(showBackgroundModal, showUnsplash, showPreviewSlides)
    const selectedElementId = selection?.selectedElementId ?? null

    useCopyPasteElement(activeSlide, selectedElementId)
    useDelete(showBackgroundModal, showUnsplash, showPreviewSlides, textEditMode)

    return (
        <div>
            <TopPanel
                slide={activeSlide}
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
                    setTextEditMode={setTextEditMode}
                />
                <SideBar
                    slide={activeSlide}
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

export {EditorView}