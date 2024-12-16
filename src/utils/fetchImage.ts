export const fetchImage = async (url: string) => {
    const response = await fetch(url)
    return await response.blob()
}