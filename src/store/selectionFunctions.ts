import {EditorType} from "./types.ts"
import {SetSelectionSlideAction, SetActiveSlideAction, SetSelectionElement} from "./redux/actions.ts"

const setActiveSlide = (editor: EditorType, action: SetActiveSlideAction): EditorType => {
    const slideId = action.payload

    return {
        ...editor,
        selection: {
            ...editor.selection,
            activeSlideId: slideId,
            selectedSlidesId: [slideId],
            selectedElementId: null,
            type: "slide"
        }
    }
}

const setSelectionSlide = (editor: EditorType, action: SetSelectionSlideAction): EditorType => {
    const slideId = action.payload

    if (slideId == editor.selection?.activeSlideId) {
        return editor
    }

    if (editor.selection?.selectedSlidesId && editor.selection?.selectedSlidesId.includes(slideId)) {
        return {
            ...editor,
            selection: {
                ...editor.selection,
                selectedSlidesId: editor.selection.selectedSlidesId.filter(id => id !== slideId),
                selectedElementId: null,
                type: "slide",
            }
        }
    }

    return {
        ...editor,
        selection: {
            ...editor.selection,
            activeSlideId: slideId,
            selectedSlidesId: [
                ...editor.selection?.selectedSlidesId ?? [],
                slideId
            ],
            selectedElementId: null,
            type: "slide",
        }
    }
}

const setSelectionElement = (editor: EditorType, action: SetSelectionElement): EditorType => {
    const elementId = action.payload
    return {
        ...editor,
        selection: {
            ...editor.selection,
            selectedSlidesId: editor.selection?.activeSlideId ? [editor.selection.activeSlideId] : [],
            selectedElementId: elementId,
            type: "element",
        }
    }
}

const resetSelectionElement = (editor: EditorType): EditorType => {
    return {
        ...editor,
        selection: {
            ...editor.selection,
            selectedElementId: null,
            type: null,
        }
    }
}

export {
    setActiveSlide,
    setSelectionSlide,
    setSelectionElement,
    resetSelectionElement
}