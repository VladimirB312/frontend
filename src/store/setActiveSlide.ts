import {EditorType} from "./EditorType.ts";

export function setActiveSlide(editor: EditorType, payload: { slideId: string }): EditorType {
    const slideId = payload.slideId

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

export function setSelectionSlide(editor: EditorType, payload: { slideId: string }): EditorType {
    const slideId = payload.slideId

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

export function setSelectionElement(editor: EditorType, payload: { elementId: string }): EditorType {
    const elementId = payload.elementId
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