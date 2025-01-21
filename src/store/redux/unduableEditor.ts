import {EditorType} from "../types.ts"
import {ActionType, EditorAction} from "./actions.ts"
import {getLocalEditor} from "../data.ts"
import {editorReducer} from "./editorReducer.ts"
import {setToLocalStorage} from "../setToLocalStorage.ts"

const HISTORY_LENGTH = 50

type StateType = {
    past: EditorType[],
    present: EditorType,
    future: EditorType[]
}

const undoable = (reducer: (editor: EditorType, action: EditorAction) => EditorType) => {
    const initialState: StateType = {
        past: [] as EditorType[],
        present: getLocalEditor(),
        future: [] as EditorType[]
    }

    return function (state = initialState, action: EditorAction): typeof initialState {
        const {past, present, future} = state

        switch (action.type) {
            case ActionType.UNDO: {
                const previous = past[past.length - 1]
                const newPast = past.slice(0, past.length - 1)
                setToLocalStorage(previous.presentation)

                return {
                    past: newPast,
                    present: previous,
                    future: [present, ...future]
                }
            }
            case ActionType.REDO: {
                const next = future[0]
                const newFuture = future.slice(1)
                setToLocalStorage(next.presentation)

                return {
                    past: [...past, present],
                    present: next,
                    future: newFuture
                }
            }
            default: {
                const newPresent = reducer(present, action)
                if (JSON.stringify(present.presentation) === JSON.stringify(newPresent.presentation)) {
                    return {
                        ...state,
                        present: newPresent
                    }
                }

                setToLocalStorage(newPresent.presentation)

                return {
                    past: [...past, present].slice(-HISTORY_LENGTH),
                    present: newPresent,
                    future: []
                }
            }
        }
    }
}

export const undoableEditorReducer = undoable(editorReducer)