export type ColorBackground = {
    color: string;
    type: 'solid';
}

export type ImageBackground = {
    src: string;
    type: 'image';
}

export type Background = ColorBackground | ImageBackground

export type Position = {
    x: number,
    y: number
}

export type Size = {
    width: number;
    height: number;
}

export type SlideElement = {
    id: string;
    position: Position,
    size: Size
}

export type TextElement = SlideElement & {
    type: 'text',
    value: string,
    textSize: number,
    font: string,
};

export type ImageElement = SlideElement & { type: 'image', src: string };

export type SelectionSlides = {
    selectedSlidesId: string[];
}

export type ActiveSlide = string;

export type Slide = {
    id: string,
    background: Background,
    objects: Array<TextElement | ImageElement>,
}

export type PresentationType = {
    title: string,
    slides: Array<Slide>,
}

export type ToolbarItem = {
    id: string,
    text: string,
    icon: string,
}

export function renamePresentationTitle(presentation: PresentationType, newTitle: string) {
    return {
        ...presentation,
        title: newTitle,
    }
}

export function addSlide(presentation: PresentationType, slide: Slide) {
    return {
        ...presentation,
        slides: [...presentation.slides, slide],
    }
}

export function removeSlide(presentation: PresentationType, slideId: string) {
    return {
        ...presentation,
        slides: presentation.slides.filter(slide => slide.id !== slideId),
    }
}

export function changeSlidePosition(presentation: PresentationType, slideId: string, newPosition: number) {
    const slideIndex: number = presentation.slides.findIndex(slide => slide.id === slideId);
    if (slideIndex === -1) {
        return presentation;
    }

    const newSlides: Slide[] = [...presentation.slides];
    const [movedSlide] = newSlides.splice(slideIndex, 1);
    newSlides.splice(newPosition, 0, movedSlide);

    return {
        ...presentation,
        slides: newSlides,
    }
}

export function changeAllSlidePos(presentation: PresentationType, slidesId: string[], newSlideId: string) {
    const slideIndex: number = presentation.slides.findIndex(slide => slide.id === slidesId[0]);
    if (slideIndex === -1) {
        return presentation;
    }

    const shift = slideIndex < presentation.slides.findIndex(slide => slide.id === newSlideId) ? 1 : 0;

    let newSlides: Slide[] = [...presentation.slides];
    const movedSlides = newSlides.filter(slide => slidesId.includes(slide.id));
    newSlides = newSlides.filter(slide => !slidesId.includes(slide.id));
    const newPosition = newSlides.findIndex(slide => slide.id === newSlideId)
    newSlides.splice(newPosition + shift, 0, ...movedSlides);

    return {
        ...presentation,
        slides: newSlides,
    }
}

export function addElement(presentation: PresentationType, slideId: string, slideElement: ImageElement | TextElement) {
    return {
        ...presentation,
        slides: presentation.slides.map(slide => {
            if (slide.id !== slideId) {
                return slide;
            }

            return {
                ...slide,
                objects: [...slide.objects, slideElement]
            }
        }),
    }
}

export function removeElement(presentation: PresentationType, slideId: string, slideElementId: string) {
    return {
        ...presentation,
        slides: presentation.slides.map(slide => {
            if (slide.id !== slideId) {
                return slide;
            }

            return {
                ...slide,
                objects: slide.objects.filter(obj => obj.id !== slideElementId) //
            }
        })
    }
}

export function changeElementPosition(presentation: PresentationType, slideId: string, slideElementId: string, newPosition: { //
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

export function changeElementSize(presentation: PresentationType, slideId: string, slideElementId: string, newSize: { //
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
                    if (obj.id === slideElementId) {
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

export function changeTextValue(presentation: PresentationType, slideId: string, slideElementId: string, newText: string) {
    return {
        ...presentation,
        slides: presentation.slides.map(slide => slide.id !== slideId
            ? slide
            : {
                ...slide,
                objects: slide.objects.map(obj => {
                    if (obj.id === slideElementId) {
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

export function changeTextSize(presentation: PresentationType, slideId: string, slideElementId: string, newSize: number) {
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
                        textSize: newSize,
                    }
                })
            })
    }
}

export function changeTextFont(presentation: PresentationType, slideId: string, slideElementId: string, newFont: string) {
    return {
        ...presentation,
        slides: presentation.slides.map(slide => slide.id !== slideId
            ? slide
            : {
                ...slide,
                objects: slide.objects.map(obj => {
                    if (obj.id === slideElementId) {
                        return obj;
                    }

                    return {
                        ...obj,
                        font: newFont,
                    }
                })
            })
    }
}

export function setBackgroundImage(presentation: PresentationType, slideId: string, newImageSrc: string) {
    return changeSlideBackground(presentation, slideId, {type: "image", src: newImageSrc});
}

export function setBackgroundColor(presentation: PresentationType, slideId: string, newColor: string) {
    return changeSlideBackground(presentation, slideId, {type: "solid", color: newColor});
}

export function changeSlideBackground(presentation: PresentationType, slideId: string, newBackground: Background) {
    return {
        ...presentation,
        slides: presentation.slides.map(slide => slide.id !== slideId
            ? slide
            : {
                ...slide,
                background: newBackground,
            }
        ),
    }
}


