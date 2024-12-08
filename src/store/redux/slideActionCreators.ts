import {ActionType} from "./actions.ts";
import {ColorBackground, ImageBackground} from "../types.ts";

function addSlide() {
    return {
        type: ActionType.ADD_SLIDE,
    }
}

function removeSlide() {
    return {
        type: ActionType.REMOVE_SLIDE,
    }
}

function setBackgroundColor(newBackground: ColorBackground) {
    return {
        type: ActionType.SET_BACKGROUND_COLOR,
        payload: newBackground
    }
}

function setBackgroundImage(newBackground: ImageBackground) {
    return {
        type: ActionType.SET_BACKGROUND_COLOR,
        payload: newBackground
    }
}

function changeSlidePosition(targetSlide: string) {
    return {
        type: ActionType.CHANGE_SLIDE_POSITION,
        payload: targetSlide,
    }
}

export {
    addSlide,
    removeSlide,
    setBackgroundColor,
    setBackgroundImage,
    changeSlidePosition
}