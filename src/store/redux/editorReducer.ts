import {EditorType} from "../types.ts";
import {getLocalEditor} from "../data.ts";
import {ActionType, EditorAction} from "./actions.ts";
import {resetSelectionElement, setActiveSlide, setSelectionElement, setSelectionSlide} from "../selectionFunctions.ts";
import {renamePresentation, loadPresentation,} from "../presentationFunctions.ts";
import {setExternalImages, setUnsplashImageSelection, toggleUnsplashFetching} from "../unsplashFunctions.ts";
import {
    addSlide,
    removeSlide,
    changeSlidePosition,
    setBackgroundColor,
    setBackgroundImage,
    setBackgroundGradient
} from "../slideFunctions.ts";
import {
    addImageElement,
    addTextElement,
    changePosition,
    changeSize,
    removeElement,
    changeTextValue,
    changeRect,
    changeTextFont,
    changeTextSize,
    changeTextColor,
    changeTextAlign,
    moveElementForward,
    moveElementBackward,
    sendElementBackward,
    sendElementForward,
    changeImageOpacity
} from "../elementFunctions.ts";

const editorReducer = (editor: EditorType = getLocalEditor(), action: EditorAction): EditorType => {
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
            return changeSlidePosition(editor, action)
        case ActionType.SET_BACKGROUND_COLOR:
            return setBackgroundColor(editor, action)
        case ActionType.SET_BACKGROUND_IMAGE:
            return setBackgroundImage(editor, action)
        case ActionType.SET_BACKGROUND_GRADIENT:
            return setBackgroundGradient(editor, action)

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
        case ActionType.CHANGE_TEXT_FONT:
            return changeTextFont(editor, action)
        case ActionType.CHANGE_TEXT_SIZE:
            return changeTextSize(editor, action)
        case ActionType.CHANGE_TEXT_COLOR:
            return changeTextColor(editor, action)
        case ActionType.CHANGE_TEXT_ALIGN:
            return changeTextAlign(editor, action)
        case ActionType.REMOVE_ELEMENT:
            return removeElement(editor)
        case ActionType.MOVE_ELEMENT_FORWARD:
            return moveElementForward(editor)
        case ActionType.MOVE_ELEMENT_BACKWARD:
            return moveElementBackward(editor)
        case ActionType.SEND_ELEMENT_BACKWARD:
            return sendElementBackward(editor)
        case ActionType.SEND_ELEMENT_FORWARD:
            return sendElementForward(editor)
        case ActionType.CHANGE_IMAGE_OPACITY:
            return changeImageOpacity(editor, action)

        case ActionType.SET_EDITOR:
            return action.payload

        case ActionType.SET_EXTERNAL_IMAGES:
            return setExternalImages(editor, action)
        case ActionType.SET_EXTERNAL_IMAGE_SELECTION:
            return setUnsplashImageSelection(editor, action)
        case ActionType.TOGGLE_EXTERNAL_IMAGES_FETCHING:
            return toggleUnsplashFetching(editor, action)

        default:
            return editor
    }
}

export {
    editorReducer,
}