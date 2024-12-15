import {applyMiddleware, legacy_createStore as createStore} from "redux";
import {undoableEditorReducer} from "./unduableEditor.ts";
import {thunk} from "redux-thunk";

const store = createStore(undoableEditorReducer, applyMiddleware(thunk))

export {
    store
}