import {ActionType} from "./actions.ts";
import {PresentationType} from "../types.ts";

const renamePresentation = (newTitle: string) => {
    return {
        type: ActionType.RENAME_PRESENTATION,
        payload: newTitle
    }
}

const loadPresentation = (loadedPresentation: PresentationType) => {
    return {
        type: ActionType.LOAD_PRESENTATION,
        payload: loadedPresentation
    }
}

const undo = () => {
    return {
        type: ActionType.UNDO
    }
}

const redo = () => {
    return {
        type: ActionType.REDO
    }
}


export {
    renamePresentation,
    loadPresentation,
    undo,
    redo,
}