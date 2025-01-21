import {ImageElement, Position, PresentationType, Size, TextElement} from "./types.ts"
import {EditorType} from "./types.ts"
import {
    AddImageElement,
    ChangeElementPosition,
    ChangeElementRect,
    ChangeElementSize,
    ChangeImageFilter,
    ChangeImageOpacity,
    ChangeTextAlign,
    ChangeTextColor,
    ChangeTextFont,
    ChangeTextSize,
    ChangeTextValue,
    PasteElement
} from "./redux/actions.ts"
import {calculatePosition} from "../utils/calculatePosition.ts"

const addElement = (editor: EditorType, newElement: ImageElement | TextElement): EditorType => {
    return {
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide => {
                if (slide.id !== editor.selection?.activeSlideId) {
                    return slide
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
            type: 'element',
        }
    }
}

const pasteElement = (editor: EditorType, action: PasteElement) => {
    const uniqueId: string = crypto.randomUUID()
    const element = {
        ...action.payload,
        id: uniqueId,
        position: {x: 300, y: 200},
    }
    return addElement(editor, element)
}

const addTextElement = (editor: EditorType) => {
    const uniqueId: string = crypto.randomUUID()

    const newTextElement: TextElement =
        {
            id: uniqueId,
            position: {x: 300, y: 200},
            size: {width: 200, height: 50},
            type: "text",
            value: "",
            textSize: 20,
            font: "Arial, sans-serif",
            color: '#000000',
            align: 'left',
        }

    return addElement(editor, newTextElement)
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
            src: action.payload.src,
            opacity: 1,
            brightness: 100,
            contrast: 100,
            saturate: 100,
            sepia: 0,
            grayscale: 0,
            blur: 0,
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
}) => {
    return {
        ...presentation,
        slides: presentation.slides.map(slide => slide.id !== slideId
            ? slide
            : {
                ...slide,
                objects: slide.objects.map(obj => {
                    if (obj.id !== slideElementId) {
                        return obj
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
                        return obj
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
                        return obj
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
                        return slide
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

const changeIndexElement = (elements: Array<TextElement | ImageElement>, elementId: string, offsetIndex: number) => {
    const elementIndex = elements.findIndex(element => element.id == elementId)

    if (elementIndex == elements.length - 1 && offsetIndex == 1) {
        return elements
    }

    if (elementIndex == 0 && offsetIndex == -1) {
        return elements
    }

    const newElements = [...elements]
    const [movedElement] = newElements.splice(elementIndex, 1)
    newElements.splice(elementIndex + offsetIndex, 0, movedElement)

    return newElements
}

const moveElement = (editor: EditorType, offsetIndex: number): EditorType => {
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
                        return slide
                    }

                    return {
                        ...slide,
                        objects: changeIndexElement(slide.objects, elementId, offsetIndex)
                    }
                })
        },
        selection: {
            ...editor.selection,
        }
    }
}

const moveElementForward = (editor: EditorType): EditorType => {
    return moveElement(editor, 1)
}

const moveElementBackward = (editor: EditorType): EditorType => {
    return moveElement(editor, -1)
}

const changeElementIndexToStart = (elements: Array<TextElement | ImageElement>, elementId: string) => {
    const elementIndex = elements.findIndex(element => element.id == elementId)

    const newElements = [...elements]
    const [movedElement] = newElements.splice(elementIndex, 1)
    newElements.unshift(movedElement)

    return newElements
}

const changeElementIndexToEnd = (elements: Array<TextElement | ImageElement>, elementId: string) => {
    const elementIndex = elements.findIndex(element => element.id == elementId)

    const newElements = [...elements]
    const [movedElement] = newElements.splice(elementIndex, 1)
    newElements.push(movedElement)

    return newElements
}

const sendElement = (editor: EditorType, changeIndex: (elements: Array<TextElement | ImageElement>, elementId: string) => Array<TextElement | ImageElement>): EditorType => {
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
                        return slide
                    }

                    return {
                        ...slide,
                        objects: changeIndex(slide.objects, elementId)
                    }
                })
        },
        selection: {
            ...editor.selection,
        }
    }
}

const sendElementBackward = (editor: EditorType): EditorType => {
    return sendElement(editor, changeElementIndexToStart)
}

const sendElementForward = (editor: EditorType): EditorType => {
    return sendElement(editor, changeElementIndexToEnd)
}

const changeTextValue = (editor: EditorType, action: ChangeTextValue): EditorType => {
    const newText = action.payload.newText
    const elementId = action.payload.elementId

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide => slide.id !== editor.selection?.activeSlideId
                ? slide
                : {
                    ...slide,
                    objects: slide.objects.map(obj => {
                        if (obj.id != elementId) {
                            return obj
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
    const newTextFont = action.payload

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
                            return obj
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
                            return obj
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
                            return obj
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
                            return obj
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

const changeImageOpacity = (editor: EditorType, action: ChangeImageOpacity): EditorType => {
    const newOpacity = action.payload

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide => slide.id !== editor.selection?.activeSlideId
                ? slide
                : {
                    ...slide,
                    objects: slide.objects.map(obj => {
                        if (obj.id != editor.selection?.selectedElementId || obj.type != 'image') {
                            return obj
                        }

                        return {
                            ...obj,
                            opacity: newOpacity,
                        }
                    })
                })
        }
    }
}

const changeImageFilter = (editor: EditorType, action: ChangeImageFilter): EditorType => {
    const filterName = action.payload.filterName
    const newValue = action.payload.newValue

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide => slide.id !== editor.selection?.activeSlideId
                ? slide
                : {
                    ...slide,
                    objects: slide.objects.map(obj => {
                        if (obj.id != editor.selection?.selectedElementId || obj.type != 'image') {
                            return obj
                        }

                        return {
                            ...obj,
                            [filterName]: newValue,
                        }
                    })
                })
        }
    }
}

const resetImageFilters = (editor: EditorType): EditorType => {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: editor.presentation.slides.map(slide => slide.id !== editor.selection?.activeSlideId
                ? slide
                : {
                    ...slide,
                    objects: slide.objects.map(obj => {
                        if (obj.id != editor.selection?.selectedElementId || obj.type != 'image') {
                            return obj
                        }

                        return {
                            ...obj,
                            opacity: 1,
                            brightness: 100,
                            contrast: 100,
                            saturate: 100,
                            sepia: 0,
                            grayscale: 0,
                            blur: 0,
                        }
                    })
                })
        }
    }
}

export {
    addTextElement,
    addImageElement,
    pasteElement,
    changePosition,
    changeSize,
    changeRect,
    removeElement,
    changeTextValue,
    changeTextFont,
    changeTextSize,
    changeTextColor,
    changeTextAlign,
    moveElementForward,
    moveElementBackward,
    sendElementBackward,
    sendElementForward,
    changeImageOpacity,
    changeImageFilter,
    resetImageFilters
}