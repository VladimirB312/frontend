import {EditorType} from "./EditorType.ts";

export function loadPresentation(editor: EditorType, loadedPresentation: EditorType) :EditorType {
    if (loadedPresentation) {
        return loadedPresentation
    }

    return editor
}