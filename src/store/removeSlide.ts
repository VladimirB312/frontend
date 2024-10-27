import {EditorType} from "./EditorType.ts";

export function removeSlide(editor: EditorType): EditorType {
    if (!editor.selection?.selectedSlidesId) {
        return editor
    }

    const removeSlideId = editor.selection.selectedSlidesId[0]

    const removeSlideIndex = editor.presentation.slides.findIndex(slide => slide.id == removeSlideId)

    const newSlides = editor.presentation.slides.filter(slide => !editor.selection?.selectedSlidesId?.includes(slide.id))

    let newSelectedSlideId = null
    if (newSlides.length > 0) {
        const index = Math.min(removeSlideIndex, newSlides.length - 1)
        newSelectedSlideId = newSlides[index].id
    }

    return {
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: {
            ...editor.selection,
            activeSlideId: newSelectedSlideId,
            selectedSlidesId: newSelectedSlideId ? [newSelectedSlideId] : [],
        }
    }
}