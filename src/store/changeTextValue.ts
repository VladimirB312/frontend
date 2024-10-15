import {PresentationType} from "./objects.ts";

// editor.selection
//     ? editor.presentation.slides.find(
//         slide => slide.id == editor.selection?.selectedSlideId)
//     : null

export function changeTextValue(presentation: PresentationType, slideId: string, slideElementId: string, newText: string) {
    return {
        ...presentation,
        slides: presentation.slides.map(slide => slide.id !== slideId
            ? slide
            : {
                ...slide,
                objects: slide.objects.map(obj => {
                    if (obj.id === slideElementId) {
                        return obj;
                    }

                    return {
                        ...obj,
                        value: newText,
                    }
                })
            })
    }
}