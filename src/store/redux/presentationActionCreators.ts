import {ActionType} from "./actions.ts";
import {PresentationType} from "../types.ts";

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

export {
    renamePresentation,
    loadPresentation
}