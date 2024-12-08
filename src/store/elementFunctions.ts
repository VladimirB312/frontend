import {ImageElement, PresentationType, TextElement} from "./types.ts";
import {EditorType} from "./types.ts";
import {AddImageElement, ChangeElementPosition, ChangeElementSize, ChangeTextValue} from "./redux/actions.ts";

function addElement(editor: EditorType, newElement: ImageElement | TextElement) {
    return {
        presentation : {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide => {
                if (slide.id !== editor.selection?.activeSlideId) {
                    return slide;
                }

                return {
                    ...slide,
                    objects: [...slide.objects, newElement]
                }
            }),
        },
        selection: {
            ...editor.selection,
            selectedElementId: newElement.id,
        }
    }
}

export function addTextElement(editor: EditorType) {
    const uniqueId: string = crypto.randomUUID()

    const newTextElement: TextElement =
        {
            id: uniqueId,
            position: {x: 300, y: 300},
            size: {width: 200, height: 50},
            type: "text",
            value: "",
            textSize: 20,
            font: "sans-serif"
        }

    return addElement(editor, newTextElement);
}

export function addImageElement(editor: EditorType, action: AddImageElement) {
    const uniqueId: string = crypto.randomUUID()

    const newImageElement: ImageElement =
        {
            id: uniqueId,
            position: {x: 350, y: 350},
            size: {width: 150, height: 150},
            type: "image",
            src: action.payload
        }

        return addElement(editor, newImageElement);
}

export function changePosition(editor: EditorType, action: ChangeElementPosition): EditorType {
    const slideId = editor.selection?.activeSlideId
    const slideElementId = editor.selection?.selectedElementId

    if (!slideId || !slideElementId) {
        return editor
    }

    return {
        ...editor,
        presentation: changeElementPosition(editor.presentation, slideId, slideElementId, action.payload),
    }
}

export function changeSize(editor: EditorType, action: ChangeElementSize): EditorType {
    const slideId = editor.selection?.activeSlideId
    const slideElementId = editor.selection?.selectedElementId

    if (!slideId || !slideElementId) {
        return editor
    }

    return {
        ...editor,
        presentation: changeElementSize(editor.presentation, slideId, slideElementId, action.payload),
    }
}

function changeElementPosition(presentation: PresentationType, slideId: string, slideElementId: string, newPosition: { //
    x: number,
    y: number
}) {
    return {
        ...presentation,
        slides: presentation.slides.map(slide => slide.id !== slideId
            ? slide
            : {
                ...slide,
                objects: slide.objects.map(obj => {
                    if (obj.id !== slideElementId) {
                        return obj;
                    }

                    return {
                        ...obj,
                        position: newPosition,
                    }
                })
            },
        )
    }
}

function changeElementSize(presentation: PresentationType, slideId: string, slideElementId: string, newSize: { //
    width: number,
    height: number
}) {
    return {
        ...presentation,
        slides: presentation.slides.map(slide => slide.id !== slideId
            ? slide
            : {
                ...slide,
                objects: slide.objects.map(obj => {
                    if (obj.id != slideElementId) {
                        return obj;
                    }

                    return {
                        ...obj,
                        size: newSize,
                    }
                })
            }
        )
    }
}

export function removeElement(editor: EditorType) : EditorType {
    if (!editor.selection?.activeSlideId || !editor.selection.selectedElementId) {
        return editor
    }

    const elementId = editor.selection.selectedElementId
    const selectedSlideId = editor.selection.activeSlideId
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(
                slide => {
                    if (slide.id !== selectedSlideId) {
                        return slide;
                    }

                    return {
                        ...slide,
                        objects: slide.objects.filter(obj => obj.id !== elementId) //
                    }
                })
        },
        selection: {
            ...editor.selection,
            selectedElementId: null
        }
    }
}

export function changeTextValue(editor: EditorType, action: ChangeTextValue): EditorType {
    const newText = action.payload;

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide => slide.id !== editor.selection?.activeSlideId
                ? slide
                : {
                    ...slide,
                    objects: slide.objects.map(obj => {
                        if (obj.id != editor.selection?.selectedElementId) {
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
}
