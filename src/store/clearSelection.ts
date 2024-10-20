import {EditorType} from "./EditorType.ts";

export function clearSelection(editor: EditorType): EditorType {
    return {
        ...editor,
        selection: {
            selectedSlideId: null,
            selectedElementId: null,
        }
    }
}