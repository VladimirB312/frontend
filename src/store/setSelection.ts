import {EditorType} from "./EditorType.ts";

export function setSelection(editor: EditorType, payload: { slideId: string }): EditorType {
    const slideId = payload.slideId

    return {
        ...editor,
        selection: {
            ...editor.selection,
            selectedSlideId: slideId,
        }
    }
}

export function setSelectionElement(editor: EditorType, payload: {elementId: string} ): EditorType {
    console.log(payload.elementId)

    const elementId = payload.elementId
    return {
        ...editor,
        selection: {
            ...editor.selection,
            selectedElementId: elementId,
        }
    }
}

// export function setSelection(editor: EditorType, newSelection: SelectionType ): EditorType {
//     return {
//         ...editor,
//         selection: newSelection
//     }
// }