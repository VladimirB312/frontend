import { EditorType } from "../EditorType";
import {SlideType} from "../objects.ts";

function createNewSlide(): SlideType {
    const uniqueId: string = crypto.randomUUID()
    return {
        id: uniqueId,
        background: {color: 'transparent', type: 'solid'},
        objects: []
    }
}
const slide = createNewSlide()

const defaultEditor: EditorType = {

    presentation: {
        title: 'Название презентации',
        slides: [
            slide
        ],
    },
    selection: {
        selectedSlidesId: [slide.id]
    }
}

export {
    defaultEditor,
}