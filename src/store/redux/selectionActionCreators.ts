import {ActionType} from "./actions.ts";

const setSelectionSlide = (slideId: string) => {
    return {
        type: ActionType.SET_SELECTION_SLIDE,
        payload: slideId,
    }
}

const setActiveSlide = (slideId: string) => {
    return {
        type: ActionType.SET_ACTIVE_SLIDE,
        payload: slideId,
    }
}

const setSelectionElement = (elementId: string) => {
    return {
        type: ActionType.SET_SELECTION_ELEMENT,
        payload: elementId
    }
}

const resetSelectionElement = () => {
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