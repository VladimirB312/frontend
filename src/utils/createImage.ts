import {ImageElement} from "../store/types.ts"

const createImage = async (image: ImageElement): Promise<string | null> => {
    const img = new Image()
    img.src = image.src

    return new Promise((resolve, reject) => {
        img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            if (!ctx) {
                reject('Failed to get canvas context')
                return
            }

            canvas.width = image.size.width
            canvas.height = image.size.height

            ctx.filter = `
                opacity(${image.opacity})
                brightness(${image.brightness}%)
                contrast(${image.contrast}%)
                saturate(${image.saturate}%)
                sepia(${image.sepia}%)
                grayscale(${image.grayscale}%)
                blur(${image.blur}px)
            `

            ctx.drawImage(img, 0, 0, image.size.width, image.size.height)

            const base64Img = canvas.toDataURL('image/png')
            resolve(base64Img)
        }

        img.onerror = (error) => {
            reject(error)
        }
    })
}

export { createImage }