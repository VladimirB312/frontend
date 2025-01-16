import {EditorType} from "./types.ts";
import {LoadPresentation, RenamePresentation} from "./redux/actions.ts";
import {validatePresentation} from "../ajvValidator.ts";

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
    const isValid = validatePresentation(loadedPresentation)

    if (loadedPresentation && isValid) {
        const selectedSlide = loadedPresentation.slides.length ? loadedPresentation.slides[0].id : null

        return {
            ...editor,
            presentation: loadedPresentation,
            selection: {
                selectedElementId: null,
                selectedSlidesId: selectedSlide ? [selectedSlide] : null,
                activeSlideId: selectedSlide
            },
        }
    }

    alert("Invalid presentation format")
    return editor
}

export {renamePresentation, loadPresentation}