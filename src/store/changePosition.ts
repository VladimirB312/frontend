import {EditorType} from "./EditorType.ts";
import {changeElementPosition} from "./objects.ts";

export function changePosition(editor: EditorType, newPosition: { x: number, y: number }): EditorType {
    const slideId = editor.selection?.activeSlideId
    const slideElementId = editor.selection?.selectedElementId

    if (!slideId || !slideElementId) {
        return editor
    }

    return {
        ...editor,
        presentation: changeElementPosition(editor.presentation, slideId, slideElementId, newPosition),
    }
}
