import {ActionType} from "./actions.ts";
import {Position, Size} from "../types.ts";

function addTextElement() {
    return {
        type: ActionType.ADD_TEXT_ELEMENT,
    }
}

function addImageElement(src: string) {
    return {
        type: ActionType.ADD_IMAGE_ELEMENT,
        payload: src,
    }
}

function changeElementPosition(newPosition: Position) {
    return {
        type: ActionType.CHANGE_ELEMENT_POSITION,
        payload: newPosition,
    }
}

function changeElementSize(newSize: Size) {
    return {
        type: ActionType.CHANGE_ELEMENT_SIZE,
        payload: newSize,
    }
}

function changeTextValue(newText: string) {
    return {
        type: ActionType.CHANGE_TEXT_VALUE,
        payload: newText,
    }
}

function removeElement() {
    return {
        type: ActionType.REMOVE_ELEMENT,
    }
}

export {
    addTextElement,
    addImageElement,
    changeElementPosition,
    changeElementSize,
    changeTextValue,
    removeElement
}