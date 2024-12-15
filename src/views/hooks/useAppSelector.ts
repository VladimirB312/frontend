import { TypedUseSelectorHook, useSelector } from "react-redux"
import {undoableEditorReducer} from "../../store/redux/unduableEditor.ts";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";

export type TAppState = ReturnType<typeof undoableEditorReducer>;
export type TDispatch = ThunkDispatch<TAppState, void, Action>;

// Выведение типа `RootState` из хранилища
export type RootState = ReturnType<typeof undoableEditorReducer>

// Используйте во всем приложении вместо `useSelector`

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {
    useAppSelector,
}