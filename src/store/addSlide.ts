import {EditorType} from "./EditorType.ts";
import {SlideType} from "./objects.ts";

export function addSlide(editor: EditorType): EditorType {
    const uniqueId: string = crypto.randomUUID()
    const newSlide: SlideType = {
        id: uniqueId,
        background: {color: 'transparent', type: 'solid'},
        objects: []
    }

    return {
        presentation: {
            ...editor.presentation,
            slides: [...editor.presentation.slides, newSlide],
        },
        selection: {
            ...editor.selection,
            activeSlideId: newSlide.id,
            selectedSlidesId: [newSlide.id],
        },
    }
}