import {UnsplashImageType} from "../types.ts";
import {ActionType} from "./actions";

const setExternalImages = (images: [UnsplashImageType] | [], totalPages: number, currentPage: number | null) => {
    return {
        type: ActionType.SET_EXTERNAL_IMAGES,
        payload: {
            images,
            totalPages,
            currentPage,
        }
    }
}

const setExternalImageSelection = (imageId: string) => {
    return {
        type: ActionType.SET_EXTERNAL_IMAGE_SELECTION,
        payload: imageId
    }
}

const toggleExternalImagesFetching = (isFetching: boolean) => {
    return {
        type: ActionType.TOGGLE_EXTERNAL_IMAGES_FETCHING,
        payload: isFetching,
    }
}

export {
    setExternalImages,
    setExternalImageSelection,
    toggleExternalImagesFetching,
}