import {EditorType, UnsplashImageType} from "../types.ts";
import {ActionType} from "./actions";

function setEditor(newEditor: EditorType) {
    return {
        type: ActionType.SET_EDITOR,
        payload: newEditor,
    }
}

function setExternalImages(images: [UnsplashImageType] | [], totalPages: number, currentPage: number | null) {
    return {
        type: ActionType.SET_EXTERNAL_IMAGES,
        payload: {
            images,
            totalPages,
            currentPage,
        }
    }
}

function setExternalImageSelection(imageId: string) {
    return {
        type: ActionType.SET_EXTERNAL_IMAGE_SELECTION,
        payload: imageId
    }
}

function toggleExternalImagesFetching(isFetching: boolean) {
    return {
        type: ActionType.TOGGLE_EXTERNAL_IMAGES_FETCHING,
        payload: isFetching,
    }
}

export {
    setEditor,
    setExternalImages,
    setExternalImageSelection,
    toggleExternalImagesFetching,
}