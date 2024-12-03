import {editor} from './data.ts'
import {EditorType} from "./EditorType.ts";


let _editor: EditorType = editor;
_editor = editor;

const localEditor  = localStorage.getItem('editor')
if (localEditor){
    const localEditorObj : EditorType | null = JSON.parse(localEditor)
    if (localEditorObj) {
        _editor = localEditorObj
    }
}

let _handler: Function | null = null;

function getEditor() {
    return _editor;
}

function setEditor(newEditor: EditorType)  {
    _editor = newEditor;
    localStorage.setItem('editor', JSON.stringify(_editor))
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