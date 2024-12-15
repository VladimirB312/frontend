import {ActionType} from "./actions.ts";
import {PresentationType, UnsplashImageType} from "../types.ts";

function renamePresentation(newTitle: string) {
    return {
        type: ActionType.RENAME_PRESENTATION,
        payload: newTitle
    }
}

function loadPresentation(loadedPresentation: PresentationType) {
    return {
        type: ActionType.LOAD_PRESENTATION,
        payload: loadedPresentation
    }
}

function undo() {
    return {
        type: ActionType.UNDO
    }
}

function redo() {
    return {
        type: ActionType.REDO
    }
}

function setUnsplashImages(images: [UnsplashImageType]) {
    return {
        type: ActionType.SET_UNSPLASH_IMAGES,
        payload: images,
    }
}

function setUnsplashImageSelection(imageId: string) {
    return {
        type: ActionType.SET_UNSPLASH_IMAGE_SELECTION,
        payload: imageId
    }
}

export {
    renamePresentation,
    loadPresentation,
    undo,
    redo,
    setUnsplashImages,
    setUnsplashImageSelection,
}