import {editor} from './data.ts'
import {EditorType} from "./EditorType.ts";

let _editor = editor;
let _handler: Function | null = null;

function getEditor() {
    return _editor;
}

function setEditor(newEditor: EditorType)  {
    _editor = newEditor;
}

function dispatch(modifyFn: Function, payload?: Object) {
    const newEditor = modifyFn(_editor, payload);
    setEditor(newEditor);

    if (_handler) {
        _handler()
    }
}

function addEditorChangeHandler(handler: Function) {
    _handler = handler;
}

export {
    getEditor,
    dispatch,
    addEditorChangeHandler,
}