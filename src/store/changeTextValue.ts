import {EditorType} from "./EditorType.ts";

type changeTextValueProps = {
    elementId: string,
    newText: string,
}

export function changeTextValue(editor: EditorType, props: changeTextValueProps): EditorType {
    const elementId = props.elementId;
    const newText = props.newText;
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