import {EditorType} from "../types.ts"
import {ColorBackground, ImageBackground, Position, PresentationType, Size} from "../types.ts";

enum ActionType {
    RENAME_PRESENTATION = 'renamePresentation',
    LOAD_PRESENTATION = 'loadPresentation',

    ADD_SLIDE = 'addSlide',
    REMOVE_SLIDE = 'removeSlide',
    CHANGE_SLIDE_POSITION = 'changeSlidePosition',
    SET_BACKGROUND_COLOR = 'setBackgroundColor',
    SET_BACKGROUND_IMAGE = 'setBackgroundImage',
    SET_SELECTION_SLIDE = 'setSelectionSlide',
    SET_ACTIVE_SLIDE = 'setActiveSlide',

    SET_SELECTION_ELEMENT = 'setSelectionElement',
    RESET_SELECTION_ELEMENT = 'resetSelectionElement',
    ADD_TEXT_ELEMENT = 'addTextElement',
    ADD_IMAGE_ELEMENT = 'addImageElement',
    CHANGE_ELEMENT_POSITION = 'changeElementPosition',
    CHANGE_ELEMENT_SIZE = 'changeElementSize',
    CHANGE_TEXT_VALUE = 'changeTextValue',
    REMOVE_ELEMENT = 'removeElement',

    SET_EDITOR = 'setEditor',
}

type RenamePresentation = {
    type: ActionType.RENAME_PRESENTATION,
    payload: string,
}

type LoadPresentation = {
    type: ActionType.LOAD_PRESENTATION,
    payload: PresentationType
}

type AddSlideAction = {
    type: ActionType.ADD_SLIDE
}

type RemoveSlideAction = {
    type: ActionType.REMOVE_SLIDE
}

type ChangeSlidePosition = {
    type: ActionType.CHANGE_SLIDE_POSITION,
    payload: string
}

type SetBackgroundColor = {
    type: ActionType.SET_BACKGROUND_COLOR,
    payload: ColorBackground,
}

type SetBackgroundImage = {
    type: ActionType.SET_BACKGROUND_IMAGE,
    payload: ImageBackground,
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

type ChangeTextValue = {
    type: ActionType.CHANGE_TEXT_VALUE,
    payload: string,
}

type RemoveElement = {
    type: ActionType.REMOVE_ELEMENT
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
    | ChangeTextValue
    | RenamePresentation
    | SetBackgroundColor
    | SetBackgroundImage
    | RemoveElement
    | ChangeSlidePosition
    | LoadPresentation


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
    type ChangeTextValue,
    type RenamePresentation,
    type SetBackgroundColor,
    type SetBackgroundImage,
    type RemoveElement,
    type ChangeSlidePosition,
    type LoadPresentation
}