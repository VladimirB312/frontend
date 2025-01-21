import {
    AlignType,
    Background,
    EditorType,
    GradientBackground,
    ImageElement,
    ImageFilterName, TextElement,
    UnsplashImageType
} from "../types.ts"
import {ColorBackground, ImageBackground, Position, PresentationType, Size} from "../types.ts"

enum ActionType {
    RENAME_PRESENTATION = 'renamePresentation',
    LOAD_PRESENTATION = 'loadPresentation',

    ADD_SLIDE = 'addSlide',
    REMOVE_SLIDE = 'removeSlide',
    CHANGE_SLIDE_POSITION = 'changeSlidePosition',
    SET_BACKGROUND_COLOR = 'setBackgroundColor',
    SET_BACKGROUND_IMAGE = 'setBackgroundImage',
    SET_BACKGROUND_GRADIENT = 'setBackgroundGradient',
    SET_ALL_SLIDES_BACKGROUND = 'setAllSlidesBackground',

    SET_SELECTION_SLIDE = 'setSelectionSlide',
    SET_ACTIVE_SLIDE = 'setActiveSlide',

    SET_SELECTION_ELEMENT = 'setSelectionElement',
    RESET_SELECTION_ELEMENT = 'resetSelectionElement',

    PASTE_ELEMENT = 'pasteElement',
    ADD_TEXT_ELEMENT = 'addTextElement',
    ADD_IMAGE_ELEMENT = 'addImageElement',
    CHANGE_ELEMENT_POSITION = 'changeElementPosition',
    CHANGE_ELEMENT_SIZE = 'changeElementSize',
    CHANGE_ELEMENT_RECT = 'changeElementRect',
    CHANGE_TEXT_VALUE = 'changeTextValue',
    CHANGE_TEXT_FONT = 'changeTextFont',
    CHANGE_TEXT_SIZE = 'changeTextSize',
    CHANGE_TEXT_COLOR = 'changeTextColor',
    CHANGE_TEXT_ALIGN = 'changeTextAlign',
    REMOVE_ELEMENT = 'removeElement',
    MOVE_ELEMENT_FORWARD = 'moveElementForward',
    MOVE_ELEMENT_BACKWARD = 'moveElementBackward',
    SEND_ELEMENT_FORWARD = 'sendElementForward',
    SEND_ELEMENT_BACKWARD = 'sendElementBackward',
    CHANGE_IMAGE_OPACITY = 'changeImageOpacity',
    CHANGE_IMAGE_FILTER = 'changeImageFilter',
    RESET_IMAGE_FILTERS = 'resetImageFilters',

    SET_EDITOR = 'setEditor',
    UNDO = 'undo',
    REDO = 'redo',

    SET_EXTERNAL_IMAGES = 'setExternalImages',
    SET_EXTERNAL_IMAGE_SELECTION = 'setExternalImageSelection',
    TOGGLE_EXTERNAL_IMAGES_FETCHING = 'toggleExternalImagesFetching',
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

type SetBackgroundGradient = {
    type: ActionType.SET_BACKGROUND_GRADIENT,
    payload: GradientBackground,
}

type SetAllSlidesBackground = {
    type: ActionType.SET_ALL_SLIDES_BACKGROUND,
    payload: Background
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

type PasteElement = {
    type: ActionType.PASTE_ELEMENT,
    payload: ImageElement | TextElement
}

type AddTextElement = {
    type: ActionType.ADD_TEXT_ELEMENT,
}

type AddImageElement = {
    type: ActionType.ADD_IMAGE_ELEMENT,
    payload: {
        src: string,
        size: Size
    },
}

type ChangeElementPosition = {
    type: ActionType.CHANGE_ELEMENT_POSITION,
    payload: Position,
}

type ChangeElementSize = {
    type: ActionType.CHANGE_ELEMENT_SIZE,
    payload: Size,
}

type ChangeElementRect = {
    type: ActionType.CHANGE_ELEMENT_RECT,
    payload: {
        position: Position,
        size: Size,
    }
}

type ChangeTextValue = {
    type: ActionType.CHANGE_TEXT_VALUE,
    payload: {
        newText: string,
        elementId: string,
    },
}

type ChangeTextFont = {
    type: ActionType.CHANGE_TEXT_FONT,
    payload: string,
}

type ChangeTextSize = {
    type: ActionType.CHANGE_TEXT_SIZE,
    payload: string,
}

type ChangeTextColor = {
    type: ActionType.CHANGE_TEXT_COLOR,
    payload: string,
}

type ChangeTextAlign = {
    type: ActionType.CHANGE_TEXT_ALIGN,
    payload: AlignType,
}

type RemoveElement = {
    type: ActionType.REMOVE_ELEMENT
}

type MoveElementForward = {
    type: ActionType.MOVE_ELEMENT_FORWARD
}

type MoveElementBackward = {
    type: ActionType.MOVE_ELEMENT_BACKWARD
}

type SendElementForward = {
    type: ActionType.SEND_ELEMENT_FORWARD
}

type SendElementBackward = {
    type: ActionType.SEND_ELEMENT_BACKWARD
}

type ChangeImageOpacity = {
    type: ActionType.CHANGE_IMAGE_OPACITY,
    payload: number,
}

type ChangeImageFilter = {
    type: ActionType.CHANGE_IMAGE_FILTER,
    payload: {
        filterName: ImageFilterName,
        newValue: number,
    }
}

type ResetImageFilters = {
    type: ActionType.RESET_IMAGE_FILTERS
}

type SetEditorAction = {
    type: ActionType.SET_EDITOR,
    payload: EditorType,
}

type Undo = {
    type: ActionType.UNDO
}

type Redo = {
    type: ActionType.REDO
}

type SetExternalImages = {
    type: ActionType.SET_EXTERNAL_IMAGES,
    payload: {
        images: [UnsplashImageType],
        totalPages: number,
        currentPage: number,
    }
}

type SetExternalImageSelection = {
    type: ActionType.SET_EXTERNAL_IMAGE_SELECTION,
    payload: string,
}

type ToggleExternalImagesFetching = {
    type: ActionType.TOGGLE_EXTERNAL_IMAGES_FETCHING,
    payload: boolean,
}

type EditorAction =
    AddSlideAction
    | RemoveSlideAction
    | SetSelectionSlideAction
    | SetActiveSlideAction
    | SetEditorAction
    | SetSelectionElement
    | ResetSelectionElement
    | PasteElement
    | AddTextElement
    | AddImageElement
    | ChangeElementPosition
    | ChangeElementSize
    | ChangeElementRect
    | ChangeTextValue
    | ChangeTextFont
    | ChangeTextSize
    | ChangeTextColor
    | ChangeTextAlign
    | MoveElementForward
    | MoveElementBackward
    | SendElementForward
    | SendElementBackward
    | ChangeImageOpacity
    | ChangeImageFilter
    | ResetImageFilters
    | RenamePresentation
    | SetBackgroundColor
    | SetBackgroundImage
    | SetBackgroundGradient
    | SetAllSlidesBackground
    | RemoveElement
    | ChangeSlidePosition
    | LoadPresentation
    | Undo
    | Redo
    | SetExternalImages
    | SetExternalImageSelection
    | ToggleExternalImagesFetching

export {
    ActionType,
    type SetSelectionSlideAction,
    type SetActiveSlideAction,
    type EditorAction,
    type SetSelectionElement,
    type ResetSelectionElement,
    type PasteElement,
    type AddImageElement,
    type ChangeElementPosition,
    type ChangeElementSize,
    type ChangeElementRect,
    type ChangeTextValue,
    type ChangeTextFont,
    type ChangeTextSize,
    type ChangeTextColor,
    type ChangeTextAlign,
    type MoveElementForward,
    type MoveElementBackward,
    type SendElementForward,
    type SendElementBackward,
    type ChangeImageOpacity,
    type ChangeImageFilter,
    type ResetImageFilters,
    type RenamePresentation,
    type SetBackgroundColor,
    type SetBackgroundImage,
    type SetBackgroundGradient,
    type SetAllSlidesBackground,
    type RemoveElement,
    type ChangeSlidePosition,
    type LoadPresentation,
    type Redo,
    type Undo,
    type SetExternalImages,
    type SetExternalImageSelection,
    type ToggleExternalImagesFetching,
}