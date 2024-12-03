import {EditorType} from "./EditorType.ts";
import {changeElementPosition, changeElementSize} from "./objects.ts";
import {ChangeElementPosition, ChangeElementSize} from "./redux/actions.ts";

export function changePosition(editor: EditorType, action: ChangeElementPosition): EditorType {
    const slideId = editor.selection?.activeSlideId
    const slideElementId = editor.selection?.selectedElementId

    if (!slideId || !slideElementId) {
        return editor
    }

    return {
        ...editor,
        presentation: changeElementPosition(editor.presentation, slideId, slideElementId, action.payload),
    }
}

export function changeSize(editor: EditorType, action: ChangeElementSize): EditorType {
    const slideId = editor.selection?.activeSlideId
    const slideElementId = editor.selection?.selectedElementId

    if (!slideId || !slideElementId) {
        return editor
    }

    return {
        ...editor,
        presentation: changeElementSize(editor.presentation, slideId, slideElementId, action.payload),
    }
}