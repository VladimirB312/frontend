import {PresentationType} from "./objects.ts";

type SelectionType = {
    selectedSlideId: string | null,
    selectedElementId: string[] | null,
}

type EditorType = {
    presentation: PresentationType,
    selection: SelectionType | null,
}

export type {
    EditorType,
    SelectionType
}