import {PresentationType} from "./objects.ts";

type SelectionType = {
    activeSlideId?: string | null,
    selectedSlidesId?: string[] | null,
    selectedElementId?: string | null,
}

type EditorType = {
    presentation: PresentationType,
    selection: SelectionType | null,
}

export type {
    EditorType,
    SelectionType
}