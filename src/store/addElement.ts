import {ImageElement, TextElement} from "./objects.ts";
import {EditorType} from "./EditorType.ts";

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

export function addImageElement(editor: EditorType, payload: {src: string}) {
    const uniqueId: string = crypto.randomUUID()

    const newImageElement: ImageElement =
        {
            id: uniqueId,
            position: {x: 350, y: 350},
            size: {width: 150, height: 150},
            type: "image",
            src: payload.src
        }

        return addElement(editor, newImageElement);
}
