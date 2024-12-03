import {EditorType} from "./EditorType.ts";
import {validate} from "../ajvValidator.ts";

export function loadPresentation(editor: EditorType, loadedPresentation: EditorType) :EditorType {
    const valid = validate(loadedPresentation)

    if (loadedPresentation && valid) {
        console.log("valid json scheme from file")
        return loadedPresentation
    }

    console.log("invalid json scheme from file", validate.errors)
    return editor
}