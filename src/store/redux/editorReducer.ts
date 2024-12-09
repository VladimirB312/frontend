import {EditorType} from "../types.ts";
import {getLocalEditor} from "../data.ts";
import {ActionType, EditorAction} from "./actions.ts";
import {addSlide, removeSlide, changeSlidePos, setBackgroundColor, setBackgroundImage} from "../slideFunctions.ts";
import {resetSelectionElement, setActiveSlide, setSelectionElement, setSelectionSlide} from "../selectionFunctions.ts";
import {
    addImageElement,
    addTextElement,
    changePosition,
    changeSize,
    removeElement,
    changeTextValue, changeRect
} from "../elementFunctions.ts";
import {renamePresentation, loadPresentation} from "../presentationFunctions.ts";

function editorReducer(editor: EditorType = getLocalEditor(), action: EditorAction): EditorType {
    switch (action.type) {
        case ActionType.RENAME_PRESENTATION:
            return renamePresentation(editor, action)
        case ActionType.LOAD_PRESENTATION:
            return loadPresentation(editor, action)

        case ActionType.ADD_SLIDE:
            return addSlide(editor)
        case ActionType.REMOVE_SLIDE:
            return removeSlide(editor)
        case ActionType.CHANGE_SLIDE_POSITION:
            return changeSlidePos(editor, action)
        case ActionType.SET_BACKGROUND_COLOR:
            return setBackgroundColor(editor, action)
        case ActionType.SET_BACKGROUND_IMAGE:
            return setBackgroundImage(editor, action)

        case ActionType.SET_SELECTION_SLIDE:
            return setSelectionSlide(editor, action)
        case ActionType.SET_ACTIVE_SLIDE:
            return setActiveSlide(editor, action)

        case ActionType.SET_SELECTION_ELEMENT:
            return setSelectionElement(editor, action)
        case ActionType.RESET_SELECTION_ELEMENT:
            return resetSelectionElement(editor)

        case ActionType.ADD_TEXT_ELEMENT:
            return addTextElement(editor)
        case ActionType.ADD_IMAGE_ELEMENT:
            return addImageElement(editor, action)
        case ActionType.CHANGE_ELEMENT_POSITION:
            return changePosition(editor, action)
        case ActionType.CHANGE_ELEMENT_SIZE:
            return changeSize(editor, action)
        case ActionType.CHANGE_ELEMENT_RECT:
            return changeRect(editor, action)
        case ActionType.CHANGE_TEXT_VALUE:
            return changeTextValue(editor, action)
        case ActionType.REMOVE_ELEMENT:
            return removeElement(editor)

        case ActionType.SET_EDITOR:
            return action.payload
        default:
            return editor
    }
}

export {
    editorReducer,
}