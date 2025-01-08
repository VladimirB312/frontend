import {ImageElement, Position, PresentationType, Size, TextElement} from "./types.ts";
import {EditorType} from "./types.ts";
import {
    AddImageElement,
    ChangeElementPosition,
    ChangeElementRect,
    ChangeElementSize, ChangeTextAlign,
    ChangeTextValue
} from "./redux/actions.ts";
import {calculatePosition} from "../utils/calculatePosition.ts";

const addElement = (editor: EditorType, newElement: ImageElement | TextElement) => {
    return {
        presentation: {
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

const addTextElement = (editor: EditorType) => {
    const uniqueId: string = crypto.randomUUID()

    const newTextElement: TextElement =
        {
            id: uniqueId,
            position: {x: 300, y: 300},
            size: {width: 200, height: 50},
            type: "text",
            value: "",
            textSize: 20,
            font: "Arial, sans-serif",
            color: '#000000',
            align: 'left',
        }

    return addElement(editor, newTextElement);
}

const addImageElement = (editor: EditorType, action: AddImageElement) => {
    const uniqueId: string = crypto.randomUUID()

    const {
        imageHeight,
        imageWidth,
        imageX,
        imageY
    } = calculatePosition(action.payload.size.height, action.payload.size.width)

    const newImageElement: ImageElement =
        {
            id: uniqueId,
            position: {x: imageX, y: imageY},
            size: {width: imageWidth, height: imageHeight},
            type: "image",
            src: action.payload.src
        }

    return addElement(editor, newImageElement)
}

const changePosition = (editor: EditorType, action: ChangeElementPosition): EditorType => {
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

const changeSize = (editor: EditorType, action: ChangeElementSize): EditorType => {
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

const changeRect = (editor: EditorType, action: ChangeElementRect): EditorType => {
    const slideId = editor.selection?.activeSlideId
    const slideElementId = editor.selection?.selectedElementId

    if (!slideId || !slideElementId) {
        return editor
    }

    return {
        ...editor,
        presentation: changeElementRect(editor.presentation, slideId, slideElementId, action.payload),
    }
}

const changeElementPosition = (presentation: PresentationType, slideId: string, slideElementId: string, newPosition: { //
    x: number,
    y: number
})=> {
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

const changeElementSize = (presentation: PresentationType, slideId: string, slideElementId: string, newSize: { //
    width: number,
    height: number
}) => {
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

const changeElementRect = (presentation: PresentationType, slideId: string, slideElementId: string, newRect: { //
    position: Position,
    size: Size,
}) => {
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
                        size: newRect.size,
                        position: newRect.position,
                    }
                })
            }
        )
    }
}

const removeElement = (editor: EditorType): EditorType => {
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

const changeTextValue = (editor: EditorType, action: ChangeTextValue): EditorType => {
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

const changeTextFont = (editor: EditorType, action: ChangeTextFont): EditorType => {
    const newTextFont = action.payload;

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
                            font: newTextFont,
                        }
                    })
                })
        }
    }
}

const changeTextSize = (editor: EditorType, action: ChangeTextSize): EditorType => {
    const newTextSize = parseInt(action.payload)

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
                            textSize: newTextSize,
                        }
                    })
                })
        }
    }
}

const changeTextColor = (editor: EditorType, action: ChangeTextColor): EditorType => {
    const newTextColor = action.payload

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
                            color: newTextColor,
                        }
                    })
                })
        }
    }
}

const changeTextAlign = (editor: EditorType, action: ChangeTextAlign): EditorType => {
    const newTextAlign = action.payload
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
                            align: newTextAlign,
                        }
                    })
                })
        }
    }
}

export {
    addTextElement,
    addImageElement,
    changePosition,
    changeSize,
    changeRect,
    removeElement,
    changeTextValue,
    changeTextFont,
    changeTextSize,
    changeTextColor,
    changeTextAlign
}