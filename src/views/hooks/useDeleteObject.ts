import {useEffect} from "react";
import {useAppActions} from "./useAppAction.ts";
import {useSelectionSelector} from "./useAppSelector.ts";

const useDeleteObject = (showBackgroundModal: boolean, showUnsplash: boolean, showPreviewSlides: boolean) => {
    const {removeElement} = useAppActions()
    const selection = useSelectionSelector()
    const isActive = selection?.activeSlideId
    const isSelected = selection?.selectedElementId

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (showBackgroundModal || showUnsplash || showPreviewSlides || !isActive || !isSelected) {
                return
            }

            if (e.code == 'Delete') {
                removeElement()
            }
        }

        document.addEventListener('keydown', handleKeydown)

        return () => {
            document.removeEventListener('keydown', handleKeydown)
        }
    }, [isActive, isSelected, removeElement])
}

export {useDeleteObject}