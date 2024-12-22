import {EditorType} from "./types.ts";
import {SetExternalImages, SetExternalImageSelection, ToggleExternalImagesFetching} from "./redux/actions.ts";

function setExternalImages(editor: EditorType, action: SetExternalImages) {
    return {
        ...editor,
        externalImages: {
            ...editor.externalImages,
            images: action.payload.images,
            imageSelectedId: null,
            totalPages: action.payload.totalPages,
            currentPage: action.payload.currentPage,
        }
    }
}

function setUnsplashImageSelection(editor: EditorType, action: SetExternalImageSelection) {
    return {
        ...editor,
        externalImages: {
            ...editor.externalImages,
            imageSelectedId: action.payload
        }
    }
}

function toggleUnsplashFetching(editor: EditorType, action: ToggleExternalImagesFetching) {
    return {
        ...editor,
        externalImages: {
            ...editor.externalImages,
            isFetching: action.payload,
        }
    }
}

function setUnsplashPageNumber(editor: EditorType, action: ToggleExternalImagesFetching) {
    return {
        ...editor,
        externalImages: {
            ...editor.externalImages,
            isFetching: action.payload,
        }
    }
}

export {
    setExternalImages,
    setUnsplashImageSelection,
    toggleUnsplashFetching,
    setUnsplashPageNumber
}

