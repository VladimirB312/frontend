import {EditorType} from "../EditorType.ts";
import {defaultEditor} from "./defaultEditor.ts";
import {ActionType, EditorAction} from "./actions.ts";
import {addSlide} from "../addSlide.ts";
import {removeSlide} from "../removeSlide.ts";
import {resetSelectionElement, setActiveSlide, setSelectionElement, setSelectionSlide} from "../setActiveSlide.ts";
import {addImageElement, addTextElement} from "../addElement.ts";
import {changePosition, changeSize} from "../changePosition.ts";


function editorReducer(editor: EditorType = defaultEditor, action: EditorAction): EditorType {
    switch (action.type) {
        case ActionType.ADD_SLIDE:
            return addSlide(editor)
        case ActionType.REMOVE_SLIDE:
            return removeSlide(editor)

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

        case ActionType.SET_EDITOR:
            return action.payload
        default:
            return editor
    }
}

export {
    editorReducer,
}