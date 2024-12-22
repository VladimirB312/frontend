import {SLIDE_HEIGHT, SLIDE_WIDTH} from "../views/SlideContent/SlideContent.tsx";

function calculatePosition(height: number, width: number): {
    imageHeight: number,
    imageWidth: number,
    imageX: number,
    imageY: number
} {
    let imageHeight = height
    let imageWidth = width
    const ratio = imageWidth / imageHeight

    if (imageHeight > SLIDE_HEIGHT) {
        imageHeight = SLIDE_HEIGHT
        imageWidth = ratio * imageHeight
    }
    if (imageWidth > SLIDE_WIDTH) {
        imageWidth = SLIDE_WIDTH
        imageHeight = imageWidth / ratio
    }

    const imageX = SLIDE_WIDTH / 2 - imageWidth / 2
    const imageY = SLIDE_HEIGHT / 2 - imageHeight / 2

    return {
        imageHeight, imageWidth, imageX, imageY
    }
}

export {
    calculatePosition
}