import {EditorType, UnsplashImageType} from "../types.ts";
import {ActionType} from "./actions";

function setEditor(newEditor: EditorType) {
    return {
        type: ActionType.SET_EDITOR,
        payload: newEditor,
    }
}

function setUnsplashState(images: [UnsplashImageType], totalPages: number, currentPage: number) {
    return {
        type: ActionType.SET_UNSPLASH_IMAGES,
        payload: {
            images,
            totalPages,
            currentPage,
        }
    }
}

function setUnsplashImageSelection(imageId: string) {
    return {
        type: ActionType.SET_UNSPLASH_IMAGE_SELECTION,
        payload: imageId
    }
}

function toggleUnsplashFetching(isFetching: boolean) {
    return {
        type: ActionType.TOGGLE_UNSPLASH_FETCHING,
        payload: isFetching,
    }
}

export {
    setEditor,
    setUnsplashState,
    setUnsplashImageSelection,
    toggleUnsplashFetching,
}