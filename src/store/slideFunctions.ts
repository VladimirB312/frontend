import {EditorType} from "./types.ts";
import {Background, PresentationType, SlideType} from "./types.ts";
import {ChangeSlidePosition, SetBackgroundColor, SetBackgroundGradient, SetBackgroundImage} from "./redux/actions.ts";

const addSlide = (editor: EditorType): EditorType => {
    const uniqueId: string = crypto.randomUUID()
    const newSlide: SlideType = {
        id: uniqueId,
        background: {color: '#ffffff', type: 'solid'},
        objects: []
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: _addSlide(editor.presentation.slides, newSlide, editor.selection?.selectedSlidesId),
        },
        selection: {
            ...editor.selection,
            activeSlideId: newSlide.id,
            selectedSlidesId: [newSlide.id],
        },
    }
}

const _addSlide = (slides: SlideType[], newSlide: SlideType, selectedSlidesId: string[] | null | undefined) => {
    const lastSelectedSlideId = selectedSlidesId?.at(-1) || slides.at(-1)?.id
    if (!lastSelectedSlideId) {
        return [newSlide]
    }

    const newSlides: SlideType[] = [];
    slides.forEach(slide => {
        newSlides.push(slide)
        if (slide.id == lastSelectedSlideId) {
            newSlides.push(newSlide)
        }
    })

    return newSlides
}

const removeSlide = (editor: EditorType): EditorType => {
    if (!editor.selection?.selectedSlidesId) {
        return editor
    }

    const removeSlideId = editor.selection.selectedSlidesId[0]

    const removeSlideIndex = editor.presentation.slides.findIndex(slide => slide.id == removeSlideId)

    const newSlides = editor.presentation.slides.filter(slide => !editor.selection?.selectedSlidesId?.includes(slide.id))

    let newSelectedSlideId = null
    if (newSlides.length > 0) {
        const index = Math.min(removeSlideIndex, newSlides.length - 1)
        newSelectedSlideId = newSlides[index].id
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
        },
        selection: {
            ...editor.selection,
            activeSlideId: newSelectedSlideId,
            selectedSlidesId: newSelectedSlideId ? [newSelectedSlideId] : [],
        }
    }
}

const changeSlidePos = (editor: EditorType, action: ChangeSlidePosition): EditorType => {
    const targetSlideId = action.payload

    if (!editor.selection?.selectedSlidesId || editor.selection?.selectedSlidesId.includes(targetSlideId)) {
        return editor
    }

    const sortedSelectedSlidesId = editor.presentation.slides
        .filter(slide => editor.selection?.selectedSlidesId?.includes(slide.id))
        .map(slide => slide.id);

    return {
        ...editor,
        presentation: changeAllSlidePosition(editor.presentation, sortedSelectedSlidesId, targetSlideId),
    }
}

const changeAllSlidePosition = (presentation: PresentationType, slidesId: string[], newSlideId: string) => {
    const slideIndex: number = presentation.slides.findIndex(slide => slide.id === slidesId[0]);
    if (slideIndex === -1) {
        return presentation;
    }

    const shift = slideIndex < presentation.slides.findIndex(slide => slide.id === newSlideId) ? 1 : 0;

    let newSlides: SlideType[] = [...presentation.slides];
    const movedSlides = newSlides.filter(slide => slidesId.includes(slide.id));
    newSlides = newSlides.filter(slide => !slidesId.includes(slide.id));
    const newPosition = newSlides.findIndex(slide => slide.id === newSlideId)
    newSlides.splice(newPosition + shift, 0, ...movedSlides);

    return {
        ...presentation,
        slides: newSlides,
    }
}

const setBackground = (editor: EditorType, newBackground: Background): EditorType => {
    return {
        ...editor,
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

const setBackgroundColor = (editor: EditorType, action: SetBackgroundColor): EditorType => {
    return setBackground(editor, action.payload);
}

const setBackgroundImage = (editor: EditorType, action: SetBackgroundImage): EditorType => {
    return setBackground(editor, action.payload);
}

const setBackgroundGradient = (editor: EditorType, action: SetBackgroundGradient): EditorType => {
    return setBackground(editor, action.payload);
}

export {
    addSlide,
    removeSlide,
    changeSlidePos,
    setBackground,
    setBackgroundColor,
    setBackgroundImage,
    setBackgroundGradient
}