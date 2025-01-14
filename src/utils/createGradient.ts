import {GradientBackground, GradientDirection} from "../store/types.ts";

const getDirection = (direction: GradientDirection, width: number, height: number) => {
    switch (direction) {
        case "to right":
            return {x0: 0, y0: 0, x1: width, y1: 0}
        case "to left":
            return  {x0: width, y0: 0, x1: 0, y1: 0}
        case "to bottom":
            return  {x0: 0, y0: 0, x1: 0, y1: height}
        case "to top":
            return  {x0: 0, y0: height, x1: 0, y1: 0}
        case "to left top":
            return  {x0: width, y0: height, x1: 0, y1: 0}
        case "to right top":
            return {x0: 0, y0: height, x1: width, y1: 0}
        case "to right bottom":
            return  {x0: 0, y0: 0, x1: width, y1: height}
        case "to left bottom":
            return {x0: width, y0: 0, x1: 0, y1: height}
        default:
            return {x0: 0, y0: 0, x1: width, y1: 0}
    }
}

const createGradient = (width: number, height: number, gradientBackground: GradientBackground) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height

    if (!ctx) {
        return
    }

    const direction = getDirection(gradientBackground.direction, width, height)

    const gradient = ctx.createLinearGradient(
        direction.x0,
        direction.y0,
        direction.x1,
        direction.y1
    )

    gradient.addColorStop(0, gradientBackground.color1)
    gradient.addColorStop(1, gradientBackground.color2)

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    return canvas.toDataURL('image/png')
}

export {createGradient}