import {ActionType} from "./actions.ts";
import {ColorBackground, ImageBackground} from "../types.ts";

const addSlide = () => {
    return {
        type: ActionType.ADD_SLIDE,
    }
}

const removeSlide = () => {
    return {
        type: ActionType.REMOVE_SLIDE,
    }
}

const setBackgroundColor = (newBackground: ColorBackground) => {
    return {
        type: ActionType.SET_BACKGROUND_COLOR,
        payload: newBackground
    }
}

const setBackgroundImage = (newBackground: ImageBackground) => {
    return {
        type: ActionType.SET_BACKGROUND_COLOR,
        payload: newBackground
    }
}

const changeSlidePosition = (targetSlide: string) => {
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