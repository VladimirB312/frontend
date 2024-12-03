import {editor} from './data.ts'
import {EditorType} from "./EditorType.ts";
import {validate} from "../ajvValidator.ts";


let _editor: EditorType = editor;
_editor = editor;

const localEditor  = localStorage.getItem('editor')
if (localEditor){
    const localEditorObj : EditorType | null = JSON.parse(localEditor)
    const valid = validate(localEditorObj)
    if (localEditorObj && valid) {
        console.log("valid json scheme from local storage")
        _editor = localEditorObj
    } else {
        console.log("invalid json scheme from local storage", validate.errors)
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