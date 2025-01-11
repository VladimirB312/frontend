import {ActionType} from "./actions.ts";
import {Position, Size} from "../types.ts";

const addTextElement = () => {
    return {
        type: ActionType.ADD_TEXT_ELEMENT,
    }
}

const addImageElement = (src: string, size: Size) => {
    return {
        type: ActionType.ADD_IMAGE_ELEMENT,
        payload: {
            src,
            size
        },
    }
}

const changeElementPosition = (newPosition: Position) => {
    return {
        type: ActionType.CHANGE_ELEMENT_POSITION,
        payload: newPosition,
    }
}

const changeElementSize = (newSize: Size) => {
    return {
        type: ActionType.CHANGE_ELEMENT_SIZE,
        payload: newSize,
    }
}

const changeElementRect = (newRect: { position: Position, size: Size }) => {
    return {
        type: ActionType.CHANGE_ELEMENT_RECT,
        payload: newRect,
    }
}

const changeTextValue = (newText: string) => {
    return {
        type: ActionType.CHANGE_TEXT_VALUE,
        payload: newText,
    }
}

const changeTextFont = (newFont: string) => {
    return {
        type: ActionType.CHANGE_TEXT_FONT,
        payload: newFont,
    }
}

const changeTextSize = (newSize: string) => {
    return {
        type: ActionType.CHANGE_TEXT_SIZE,
        payload: newSize,
    }
}

const changeTextColor = (newColor: string) => {
    return {
        type: ActionType.CHANGE_TEXT_COLOR,
        payload: newColor,
    }
}

const changeTextAlign = (newAlign: string) => {
    return {
        type: ActionType.CHANGE_TEXT_ALIGN,
        payload: newAlign,
    }
}

const removeElement = () => {
    return {
        type: ActionType.REMOVE_ELEMENT,
    }
}

const moveElementForward = () => {
    return {
        type: ActionType.MOVE_ELEMENT_FORWARD
    }
}

const moveElementBackward = () => {
    return {
        type: ActionType.MOVE_ELEMENT_BACKWARD
    }
}

const sendElementBackward = () => {
    return {
        type: ActionType.SEND_ELEMENT_BACKWARD
    }
}

const sendElementForward = () => {
    return {
        type: ActionType.SEND_ELEMENT_FORWARD
    }
}

export {
    addTextElement,
    addImageElement,
    changeElementPosition,
    changeElementSize,
    changeElementRect,
    changeTextValue,
    changeTextFont,
    changeTextSize,
    changeTextColor,
    changeTextAlign,
    removeElement,
    moveElementForward,
    moveElementBackward,
    sendElementBackward,
    sendElementForward,
}