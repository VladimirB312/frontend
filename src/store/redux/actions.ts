import {EditorType} from "../EditorType"
import {Position, Size} from "../types.ts";

enum ActionType {
    ADD_SLIDE = 'addSlide',
    REMOVE_SLIDE = 'removeSlide',

    SET_SELECTION_SLIDE = 'setSelectionSlide',
    SET_ACTIVE_SLIDE = 'setActiveSlide',

    SET_SELECTION_ELEMENT = 'setSelectionElement',
    RESET_SELECTION_ELEMENT = 'resetSelectionElement',
    ADD_TEXT_ELEMENT = 'addTextElement',
    ADD_IMAGE_ELEMENT = 'addImageElement',
    CHANGE_ELEMENT_POSITION = 'changeElementPosition',
    CHANGE_ELEMENT_SIZE = 'changeElementSize',

    SET_EDITOR = 'setEditor',
}

type AddSlideAction = {
    type: ActionType.ADD_SLIDE
}

type RemoveSlideAction = {
    type: ActionType.REMOVE_SLIDE
}

type SetSelectionSlideAction = {
    type: ActionType.SET_SELECTION_SLIDE,
    payload: string
}

type SetActiveSlideAction = {
    type: ActionType.SET_ACTIVE_SLIDE,
    payload: string,
}

type SetSelectionElement = {
    type: ActionType.SET_SELECTION_ELEMENT,
    payload: string,
}

type ResetSelectionElement = {
    type: ActionType.RESET_SELECTION_ELEMENT,
}

type AddTextElement = {
    type: ActionType.ADD_TEXT_ELEMENT,
}

type AddImageElement = {
    type: ActionType.ADD_IMAGE_ELEMENT,
    payload: string,
}

type ChangeElementPosition = {
    type: ActionType.CHANGE_ELEMENT_POSITION,
    payload: Position,
}

type ChangeElementSize = {
    type: ActionType.CHANGE_ELEMENT_SIZE,
    payload: Size,
}

type SetEditorAction = {
    type: ActionType.SET_EDITOR,
    payload: EditorType,
}

type EditorAction =
    AddSlideAction
    | RemoveSlideAction
    | SetSelectionSlideAction
    | SetActiveSlideAction
    | SetEditorAction
    | SetSelectionElement
    | ResetSelectionElement
    | AddTextElement
    | AddImageElement
    | ChangeElementPosition
    | ChangeElementSize

export {
    ActionType,
    type SetSelectionSlideAction,
    type SetActiveSlideAction,
    type EditorAction,
    type SetSelectionElement,
    type ResetSelectionElement,
    type AddImageElement,
    type ChangeElementPosition,
    type ChangeElementSize,
}