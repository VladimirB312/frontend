import {EditorType} from "./EditorType.ts";
import {Slide} from "./objects.ts";

export function addSlide(editor: EditorType): EditorType {
    const uniqueId = crypto.randomUUID()
    const newSlide: Slide = {
        id: uniqueId,
        background: {color: 'transparent', type: 'solid'},
        objects: []
    }

    return {
        presentation: {
            ...editor.presentation,
            slides: [...editor.presentation.slides, newSlide],
        },
        selection: editor.selection,
    }
}