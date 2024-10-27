import {EditorType} from "./EditorType.ts";

export function clearSelection(editor: EditorType): EditorType {
    return {
        ...editor,
        selection: {
            activeSlideId: null,
            selectedElementId: null,
        }
    }
}