import { legacy_createStore as createStore } from "redux";
import {undoableEditorReducer} from "./unduableEditor.ts";

const store = createStore(undoableEditorReducer)

export {
    store
}