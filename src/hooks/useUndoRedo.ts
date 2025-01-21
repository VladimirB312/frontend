import {useAppSelector} from "./useAppSelector.ts"
import {useEffect} from "react"
import {useAppActions} from "./useAppAction.ts"

const useUndoRedo = (showBackgroundModal: boolean, showUnsplash: boolean, showPreviewSlides: boolean): { undoDisabled: boolean, redoDisabled: boolean } => {
    const undoDisabled = !useAppSelector(state => state.past.length)
    const redoDisabled = !useAppSelector(state => state.future.length)

    const {undo, redo} = useAppActions()

    useEffect(() => {
        const onUndo = () => {
            if (!undoDisabled) {
                undo()
            }
        }

        const onRedo = () => {
            if (!redoDisabled) {
                redo()
            }
        }

        const handleKeydown = (e: KeyboardEvent) => {
            if (showBackgroundModal || showUnsplash || showPreviewSlides) {
                return
            }
            
            if (e.code == 'KeyZ' && (e.ctrlKey || e.metaKey)) {
                onUndo()
            }
            if (e.code == 'KeyY' && (e.ctrlKey || e.metaKey)) {
                onRedo()
            }
        }

        document.addEventListener('keydown', handleKeydown)

        return () => {
            document.removeEventListener('keydown', handleKeydown)
        }
    }, [redo, redoDisabled, showBackgroundModal, showPreviewSlides, showUnsplash, undo, undoDisabled])

    return {
        undoDisabled,
        redoDisabled,
    }
}

export {useUndoRedo}