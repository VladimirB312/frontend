import {useEffect} from "react";
import {useAppActions} from "./useAppAction.ts";
import {useSelectionSelector} from "./useAppSelector.ts";

const useDelete = (showBackgroundModal: boolean, showUnsplash: boolean, showPreviewSlides: boolean, textEditMode: boolean) => {
    const {removeSlide,removeElement} = useAppActions()
    const selection = useSelectionSelector()
    const isActive = selection?.activeSlideId
    const isSelected = selection?.selectedElementId
    const selectionType = selection?.type

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (showBackgroundModal || showUnsplash || showPreviewSlides || !isActive) {
                return
            }

            if (e.code != 'Delete') {
                return
            }

            if (isSelected && selectionType == 'element' && !textEditMode) {
                removeElement()
                return
            }

            if (selectionType == 'slide') {
                removeSlide()
            }
        }

        document.addEventListener('keydown', handleKeydown)

        return () => {
            document.removeEventListener('keydown', handleKeydown)
        }
    }, [isActive, isSelected, removeSlide, selectionType, showBackgroundModal, showPreviewSlides, showUnsplash])
}

export {useDelete}