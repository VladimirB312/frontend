import {PresentationType} from "./types.ts"
import {EditorType} from "./types.ts"
import {validatePresentation} from "../utils/ajvValidator.ts"

const presentation: PresentationType = {
    title: "Новая презентация",
    slides: []
}

const defaultEditor: EditorType = {
    presentation,
    selection: {
        activeSlideId: null,
        selectedElementId: null,
    }
}

const getLocalEditor = (): EditorType => {
    const localPresentation = localStorage.getItem('presentationData')
    if (!localPresentation) {
        return defaultEditor
    }

    const localPresentationObj: PresentationType | null = JSON.parse(localPresentation)
    const valid = validatePresentation(localPresentationObj)
    if (localPresentationObj && valid) {
        const selectedSlideId = localPresentationObj.slides.length ? localPresentationObj.slides[0].id : null
        return {
            presentation: localPresentationObj,
            selection: {
                selectedElementId: null,
                selectedSlidesId: selectedSlideId ? [selectedSlideId] : null,
                activeSlideId: selectedSlideId ?? null,
            }
        }
    } else {
        return defaultEditor
    }
}

export {
    getLocalEditor
}