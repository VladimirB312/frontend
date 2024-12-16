import {EditorType} from "./types.ts";
import {SetUnsplashState, SetUnsplashImageSelection, ToggleUnsplashFetching} from "./redux/actions.ts";

export function setUnsplashState(editor: EditorType, action: SetUnsplashState) {
    return {
        ...editor,
        unsplashState: {
            ...editor.unsplashState,
            images: action.payload.images,
            imageSelectedId: null,
            totalPages: action.payload.totalPages,
            currentPage: action.payload.currentPage,
        }
    }
}

export function setUnsplashImageSelection(editor: EditorType, action: SetUnsplashImageSelection) {
    return {
        ...editor,
        unsplashState: {
            ...editor.unsplashState,
            imageSelectedId: action.payload
        }
    }
}

export function toggleUnsplashFetching(editor: EditorType, action: ToggleUnsplashFetching) {
    return {
        ...editor,
        unsplashState: {
            ...editor.unsplashState,
            isFetching: action.payload,
        }
    }
}

export function setUnsplashPageNumber(editor: EditorType, action: ToggleUnsplashFetching) {
    return {
        ...editor,
        unsplashState: {
            ...editor.unsplashState,
            isFetching: action.payload,
        }
    }
}

