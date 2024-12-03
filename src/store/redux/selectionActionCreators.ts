import {ActionType} from "./actions.ts";

function setSelectionSlide(slideId: string) {
    return {
        type: ActionType.SET_SELECTION_SLIDE,
        payload: slideId,
    }
}

function setActiveSlide(slideId: string) {
    return {
        type: ActionType.SET_ACTIVE_SLIDE,
        payload: slideId,
    }
}

function setSelectionElement(elementId: string) {
    return {
        type: ActionType.SET_SELECTION_ELEMENT,
        payload: elementId
    }
}

function resetSelectionElement() {
    return {
        type: ActionType.RESET_SELECTION_ELEMENT,
    }
}

export {
    setSelectionSlide,
    setActiveSlide,
    setSelectionElement,
    resetSelectionElement
}