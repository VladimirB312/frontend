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

export type Slide = {
    id: string,
    background: Background,
    objects: Array<TextElement | ImageElement>,
}

export type PresentationType = {
    title: string,
    slides: Array<Slide>,
}

export type SelectionType = {
    activeSlideId?: string | null,
    selectedSlidesId?: string[] | null,
    selectedElementId?: string | null,
}

export type EditorType = {
    presentation: PresentationType,
    selection: SelectionType | null,
}