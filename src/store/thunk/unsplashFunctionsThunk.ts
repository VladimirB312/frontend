import {RootState, TDispatch} from "../../views/hooks/useAppSelector.ts";
import {addUnsplashImageElement} from "../redux/elementActionCreators.ts";
import {fetchImage} from "../../utils/fetchImage.ts";
import {convertToBase64} from "../../utils/convertToBase64.ts";
import {fetchRequest} from "../../api/unsplashApi.ts";
import {setUnsplashState, toggleUnsplashFetching} from "../redux/editorActionCreators.ts";

const requestToApi = async (query: string, currentPage: number) => {
    const data = await fetchRequest(query, currentPage)
    const images = data.results.map((img: {
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
    const totalPages = data.total_pages

    return {images, totalPages}
}

const setUnsplashPage = (query: string, pageNumber: number) => {
    console.log('pageNumber = ', pageNumber)
    return async (dispatch: TDispatch) => {
        dispatch(toggleUnsplashFetching(true))

        try {
            const {images, totalPages} = await requestToApi(query, pageNumber)
            dispatch(setUnsplashState(images, totalPages, pageNumber))
        } catch {
            console.log('error in requestImages')
        } finally {
            dispatch(toggleUnsplashFetching(false))
        }
    }
}

const requestImages = (query: string) => {
    return async (dispatch: TDispatch) => {
        dispatch(toggleUnsplashFetching(true))

        // const currentPage = getState().present.unsplashState?.currentPage || 1
        const currentPage = 1

        try {
            const {images, totalPages} = await requestToApi(query, currentPage)
            dispatch(setUnsplashState(images, totalPages, currentPage))
        } catch {
            dispatch(setUnsplashState([], 0, null))
            console.log('error in requestImages')
        } finally {
            dispatch(toggleUnsplashFetching(false))
        }
    }
}

const addUnsplashImageToSlide = () => {
    return async (dispatch: TDispatch, getState: () => RootState) => {
        try {
            const selectedImageId = getState().present.unsplashState?.imageSelectedId
            const image = getState().present.unsplashState?.images?.find(img => img.id == selectedImageId)
            if (!image || !image.src) {
                throw new Error('Error: no image selected')
            }
            const blob = await fetchImage(image.src)
            const base64Image = await convertToBase64(blob)

            dispatch(addUnsplashImageElement(base64Image, {
                width: image.width, height: image.height
            }))
        } catch (error) {
            console.log('Error add unsplash image to slide: ', error)
        }
    }
}

export {
    requestImages,
    setUnsplashPage,
    addUnsplashImageToSlide,
}