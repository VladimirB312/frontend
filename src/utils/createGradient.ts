const createGradient = (width: number, height: number) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height

    if (!ctx) {
        return
    }

    const gradient = ctx.createLinearGradient(0, 0, 200, 0)
    gradient.addColorStop(0, 'red')
    gradient.addColorStop(1, 'blue')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    return canvas.toDataURL('image/png')
}

export {createGradient}