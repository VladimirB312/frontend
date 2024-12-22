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

export type SlideType = {
    id: string,
    background: Background,
    objects: Array<TextElement | ImageElement>,
}

export type PresentationType = {
    title: string,
    slides: Array<SlideType>,
}

export type SelectionType = {
    activeSlideId?: string | null,
    selectedSlidesId?: string[] | null,
    selectedElementId?: string | null,
}

export type UnsplashImageType = {
    src: string,
    id: string,
    width: number,
    height: number,
}
export type ExternalImagesStateType = {
    images?: [UnsplashImageType] | [],
    imageSelectedId?: string | null,
    isFetching?: boolean,
    currentPage?: number,
    totalPages?: number,
}

export type EditorType = {
    presentation: PresentationType,
    selection: SelectionType | null,
    externalImages?: ExternalImagesStateType,

}