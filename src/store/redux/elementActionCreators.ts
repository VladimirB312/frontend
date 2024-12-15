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

function addUnsplashImageElement(src: string, size: Size) {
    return {
        type: ActionType.ADD_UNSPLASH_IMAGE_ELEMENT,
        payload: {
            src,
            size
        }
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

function changeElementRect(newRect: { position: Position, size: Size }) {
    return {
        type: ActionType.CHANGE_ELEMENT_RECT,
        payload: newRect,
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
    addUnsplashImageElement,
    changeElementPosition,
    changeElementSize,
    changeTextValue,
    removeElement,
    changeElementRect
}