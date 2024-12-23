import {EditorType} from "./types.ts";
import {SetSelectionSlideAction, SetActiveSlideAction, SetSelectionElement} from "./redux/actions.ts";

function setActiveSlide(editor: EditorType, action: SetActiveSlideAction): EditorType {
    const slideId = action.payload

    return {
        ...editor,
        selection: {
            ...editor.selection,
            activeSlideId: slideId,
            selectedSlidesId: [slideId],
            selectedElementId: null,
        }
    }
}

function setSelectionSlide(editor: EditorType, action: SetSelectionSlideAction): EditorType {
    const slideId = action.payload

    if (slideId == editor.selection?.activeSlideId) {
        return editor;
    }

    if (editor.selection?.selectedSlidesId && editor.selection?.selectedSlidesId.includes(slideId)) {
        return {
            ...editor,
            selection: {
                ...editor.selection,
                selectedSlidesId: editor.selection.selectedSlidesId.filter(id => id !== slideId),
                selectedElementId: null,
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
        }
    }
}

function setSelectionElement(editor: EditorType, action: SetSelectionElement): EditorType {
    const elementId = action.payload
    return {
        ...editor,
        selection: {
            ...editor.selection,
            selectedSlidesId: editor.selection?.activeSlideId ? [editor.selection.activeSlideId] : [],
            selectedElementId: elementId,
        }
    }
}

function resetSelectionElement(editor: EditorType): EditorType {
    return {
        ...editor,
        selection: {
            ...editor.selection,
            selectedElementId: null,
        }
    }
}

export {
    setActiveSlide,
    setSelectionSlide,
    setSelectionElement,
    resetSelectionElement
}