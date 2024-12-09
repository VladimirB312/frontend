import { TypedUseSelectorHook, useSelector } from "react-redux"
import {undoableEditorReducer} from "../../store/redux/unduableEditor.ts";

// Выведение типа `RootState` из хранилища
type RootState = ReturnType<typeof undoableEditorReducer>

// Используйте во всем приложении вместо `useSelector`

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {
    useAppSelector,
}