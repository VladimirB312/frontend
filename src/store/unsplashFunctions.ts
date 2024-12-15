import {setUnsplashImages} from "./redux/presentationActionCreators.ts";
import {RootState, TDispatch} from "../views/hooks/useAppSelector.ts";
import {addUnsplashImageElement} from "./redux/elementActionCreators.ts";

const Access_Key = 'CxRMUvkYgKq2RiqPAK1uXm2cb-yo5tzY_Emrf2SQey8'

const fetchRequest = async (query: string) => {
    const data = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${Access_Key}`
    );
    const dataJ = await data.json();
    return dataJ.results
}


const requestImages = (query: string) => {
    return async (dispatch: TDispatch) => {
        try {
            const data = await fetchRequest(query)
            const images = data.map((img: {
                id: string,
                width: number,
                height: number,
                urls: {
                    regular: string,
                    small: string,
                }
            }) => {
                return {
                    id: img.id,
                    src: img.urls.small,
                    width: img.width,
                    height: img.height
                }
            })
            dispatch(setUnsplashImages(images))
        } catch {
            console.error('error in requestImages')
        }
    }
}

const fetchImage = async (url: string) => {
    const response = await fetch(url)
    return await response.blob()
}

const convertToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            resolve(reader.result as string)
        }
        reader.onerror = reject
        reader.readAsDataURL(blob)
    })
}

const addUnsplashImageToSlide = () => {
    return async (dispatch: TDispatch, getState: () => RootState) => {
        try {
            const selectedImageId = getState().present.unsplashImageSelectedId
            const image = getState().present.unsplashImages?.find(img => img.id == selectedImageId)
            if (!image || !image.src) {
                throw new Error('Error: no image selected')
            }
            const blob = await fetchImage(image.src)
            const base64Image = await convertToBase64(blob)

            dispatch(addUnsplashImageElement(base64Image, {
                width: image.width, height: image.height
            }))
        } catch (error) {
            console.error('Error add unsplash image to slide: ', error)
        }
    }
}

export {
    requestImages,
    addUnsplashImageToSlide
}