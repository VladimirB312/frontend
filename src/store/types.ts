type ColorBackground = {
    color: string,
    type: 'solid',
}

type ImageBackground = {
    src: string,
    type: 'image',
}

type GradientDirection = 'none'
    | 'to top'
    | 'to right top'
    | 'to right'
    | 'to right bottom'
    | 'to bottom'
    | 'to left bottom'
    | 'to left'
    | 'to left top'

type GradientBackground = {
    type: 'gradient',
    direction: GradientDirection,
    color1: string,
    color2: string,
}

type Background = ColorBackground | ImageBackground | GradientBackground

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

type AlignType = 'left' | 'center' | 'right'

type TextElement = SlideElement & {
    type: 'text',
    value: string,
    textSize: number,
    font: string,
    color: string,
    align: AlignType,
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
    type?: 'element' | 'slide' | 'textEdit' | null
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
    GradientBackground,
    GradientDirection,
    Background,
    Position,
    Size,
    SlideElement,
    TextElement,
    AlignType,
    ImageElement,
    SlideType,
    PresentationType,
    SelectionType,
    UnsplashImageType,
    ExternalImagesStateType,
    EditorType
}