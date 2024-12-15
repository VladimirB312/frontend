import {EditorType} from "./types.ts";
import {LoadPresentation, RenamePresentation, SetUnsplashImages, SetUnsplashImageSelection} from "./redux/actions.ts";
import {validate} from "../ajvValidator.ts";

export function renamePresentation(editor: EditorType, action: RenamePresentation): EditorType {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: action.payload
        }
    }
}

export function loadPresentation(editor: EditorType, action: LoadPresentation): EditorType {
    const loadedPresentation = action.payload
    const valid = validate(loadedPresentation)

    if (loadedPresentation && valid) {
        console.log("valid json scheme from file")
        return {
            ...editor,
            presentation: loadedPresentation,
            selection: null,
        }
    }

    console.log("invalid json scheme from file", validate.errors)
    return editor
}

export function setUnsplashImages (editor: EditorType, action: SetUnsplashImages) {
    return {
        ...editor,
        unsplashImages: action.payload,
        unsplashImageSelectedId: null,
    }
}

export function setUnsplashImageSelection(editor: EditorType, action: SetUnsplashImageSelection) {
    return {
        ...editor,
        unsplashImageSelectedId: action.payload,
    }
}