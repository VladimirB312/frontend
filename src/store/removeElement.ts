import {EditorType} from "./EditorType.ts";

export function removeElement(editor: EditorType) : EditorType {
    if (!editor.selection?.selectedSlideId || !editor.selection.selectedElementId) {
        return editor
    }

    const elementId = editor.selection.selectedElementId
    const selectedSlideId = editor.selection.selectedSlideId
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(
                slide => {
                    if (slide.id !== selectedSlideId) {
                        return slide;
                    }

                    return {
                        ...slide,
                        objects: slide.objects.filter(obj => obj.id !== elementId) //
                    }
                })
        },
        selection: {
            ...editor.selection,
            selectedElementId: null
        }
    }
}