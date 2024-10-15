import {EditorType} from "./EditorType.ts";

export function renamePresentationTitle(editor: EditorType, newTitle: string): EditorType {
    return {
        presentation: {
            ...editor.presentation,
            title: newTitle
        },
        selection: editor.selection
    }
}