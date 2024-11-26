import {EditorType} from "./EditorType.ts";
import {changeElementPosition, changeElementSize, Position, Size} from "./objects.ts";

export function changePosition(editor: EditorType, newPosition: Position): EditorType {
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

export function changeSize(editor: EditorType, newSize: Size): EditorType {
    const slideId = editor.selection?.activeSlideId
    const slideElementId = editor.selection?.selectedElementId

    if (!slideId || !slideElementId) {
        return editor
    }

    return {
        ...editor,
        presentation: changeElementSize(editor.presentation, slideId, slideElementId, newSize),
    }
}