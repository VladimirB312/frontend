import {EditorType} from "./types.ts";
import {LoadPresentation, RenamePresentation} from "./redux/actions.ts";
import {validate} from "../ajvValidator.ts";

const renamePresentation = (editor: EditorType, action: RenamePresentation): EditorType => {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: action.payload
        }
    }
}

const loadPresentation = (editor: EditorType, action: LoadPresentation): EditorType => {
    const loadedPresentation = action.payload
    const valid = validate(loadedPresentation)

    if (loadedPresentation && valid) {
        return {
            ...editor,
            presentation: loadedPresentation,
            selection: null,
        }
    }

    alert("Invalid presentation format")
    return editor
}

export {renamePresentation, loadPresentation}