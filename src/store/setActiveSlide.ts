import {EditorType} from "./EditorType.ts";
import {SetSelectionSlideAction, SetActiveSlideAction, SetSelectionElement} from "./redux/actions.ts";

export function setActiveSlide(editor: EditorType, action: SetActiveSlideAction): EditorType {
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

export function setSelectionSlide(editor: EditorType, action: SetSelectionSlideAction): EditorType {
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

export function setSelectionElement(editor: EditorType, action: SetSelectionElement): EditorType {
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

export function resetSelectionElement(editor: EditorType): EditorType {
    return {
        ...editor,
        selection: {
            ...editor.selection,
            selectedElementId: null,
        }
    }
}