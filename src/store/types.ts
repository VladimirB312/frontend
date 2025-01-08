type ColorBackground = {
    color: string,
    type: 'solid',
}

type ImageBackground = {
    src: string,
    type: 'image',
}

// type GradientDirection = 'right' | 'top' | 'left' | 'center' | 'bottom'
//
// type GradientColor = {
//     color: string,
//     colorStop: number,
// }
//
// type GradientBackground = {
//     type: 'gradient',
//     direction: GradientDirection,
//     colors: GradientColor[],
// }

type Background = ColorBackground | ImageBackground

type Position = {
    x: number,
    y: number
}

type Size = {
    width: number,
    height: number,
}

type SlideElement = {
    id: string,
    position: Position,
    size: Size,
}

type TextElement = SlideElement & {
    type: 'text',
    value: string,
    textSize: number,
    font: string,
    color: string,
    align: string,
};

type ImageElement = SlideElement & { type: 'image', src: string };

type SlideType = {
    id: string,
    background: Background,
    objects: Array<TextElement | ImageElement>,
}

type PresentationType = {
    title: string,
    slides: Array<SlideType>,
}

type SelectionType = {
    activeSlideId?: string | null,
    selectedSlidesId?: string[] | null,
    selectedElementId?: string | null,
    type?: 'element' | 'slide' | null
}

type UnsplashImageType = {
    src: string,
    id: string,
    width: number,
    height: number,
}
type ExternalImagesStateType = {
    images?: [UnsplashImageType] | [],
    imageSelectedId?: string | null,
    isFetching?: boolean,
    currentPage?: number,
    totalPages?: number,
}

type EditorType = {
    presentation: PresentationType,
    selection: SelectionType | null,
    externalImages?: ExternalImagesStateType,
}

export type {
    ColorBackground,
    ImageBackground,
    Background,
    Position,
    Size,
    SlideElement,
    TextElement,
    ImageElement,
    SlideType,
    PresentationType,
    SelectionType,
    UnsplashImageType,
    ExternalImagesStateType,
    EditorType
}