import {EditorType} from "./EditorType.ts";
import {Background, ColorBackground, ImageBackground} from "./objects.ts";

function setBackground(editor: EditorType, newBackground: Background): EditorType {
    return {
        presentation: {
            ...editor.presentation,
            slides:
                editor.presentation.slides.map(slide =>
                    slide.id != editor.selection?.activeSlideId
                        ? slide
                        : {
                            ...slide,
                            background: newBackground
                        }
                ),
        },
        selection: editor.selection
    }
}

export function setBackgroundColor(editor: EditorType, newBackground: ColorBackground): EditorType {
    return setBackground(editor, newBackground);
}

export function setBackgroundImage(editor: EditorType, newBackground: ImageBackground): EditorType {
    return setBackground(editor, newBackground);
}