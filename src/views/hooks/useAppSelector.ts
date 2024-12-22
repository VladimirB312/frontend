import { TypedUseSelectorHook, useSelector } from "react-redux"
import {undoableEditorReducer} from "../../store/redux/unduableEditor.ts";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";

type TAppState = ReturnType<typeof undoableEditorReducer>;
type TDispatch = ThunkDispatch<TAppState, void, Action>;
type RootState = ReturnType<typeof undoableEditorReducer>

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
const usePresentationSelector = () => useAppSelector(state => state.present.presentation)
const useSlidesSelector = () => useAppSelector(state => state.present.presentation.slides)
const useSelectionSelector = () => useAppSelector(state => state.present.selection)
const useExternalImagesSelector = () => useAppSelector(state => state.present.externalImages)


export {
    useAppSelector,
    usePresentationSelector,
    useSlidesSelector,
    useSelectionSelector,
    useExternalImagesSelector
}

export type {
    TAppState,
    TDispatch,
    RootState
}