import {EditorType} from "./EditorType.ts";
import {changeAllSlidePos} from "./objects.ts";

export function changeSlidePos(editor: EditorType, payload: { slideId: string, newSlideId: string }): EditorType {


    if (!editor.selection?.selectedSlidesId || editor.selection?.selectedSlidesId.includes(payload.newSlideId)) {
        return editor
    }

    const sortedSelectedSlidesId = editor.presentation.slides
        .filter(slide => editor.selection?.selectedSlidesId?.includes(slide.id))
        .map(slide => slide.id);

    console.log(sortedSelectedSlidesId)

    // return {
    //     ...editor,
    //     presentation: changeSlidePosition(editor.presentation, payload.slideId, newPosition),
    //
    // }

    return {
        ...editor,
        presentation: changeAllSlidePos(editor.presentation, sortedSelectedSlidesId, payload.newSlideId),
        // selection: {
        //     activeSlideId: null,
        //     selectedElementId: null,
        // }
    }
}