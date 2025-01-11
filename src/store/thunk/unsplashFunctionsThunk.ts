import {RootState, TDispatch} from "../../views/hooks/useAppSelector.ts";
import {addImageElement} from "../redux/elementActionCreators.ts";
import {fetchImage} from "../../utils/fetchImage.ts";
import {convertToBase64} from "../../utils/convertToBase64.ts";
import {fetchRequest} from "../../api/unsplashApi.ts";
import {setExternalImages, toggleExternalImagesFetching} from "../redux/editorActionCreators.ts";
import {ImageBackground} from "../types.ts";
import {setBackgroundImage} from "../redux/slideActionCreators.ts";

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
        dispatch(toggleExternalImagesFetching(true))

        try {
            const {images, totalPages} = await requestToApi(query, pageNumber)
            dispatch(setExternalImages(images, totalPages, pageNumber))
        } catch {
            console.log('error in requestImages')
        } finally {
            dispatch(toggleExternalImagesFetching(false))
        }
    }
}

const requestImages = (query: string) => {
    return async (dispatch: TDispatch) => {
        dispatch(toggleExternalImagesFetching(true))

        // const currentPage = getState().present.unsplashState?.currentPage || 1
        const currentPage = 1

        try {
            const {images, totalPages} = await requestToApi(query, currentPage)
            dispatch(setExternalImages(images, totalPages, currentPage))
        } catch {
            dispatch(setExternalImages([], 0, null))
            console.log('error in requestImages')
        } finally {
            dispatch(toggleExternalImagesFetching(false))
        }
    }
}

const addUnsplashImageToSlide = () => {
    return async (dispatch: TDispatch, getState: () => RootState) => {
        try {
            const state = getState()
            const selectedImageId = state.present.externalImages?.imageSelectedId
            const image = state.present.externalImages?.images?.find(img => img.id == selectedImageId)
            if (!image || !image.src) {
                throw new Error('Error: no image selected')
            }
            const blob = await fetchImage(image.src)
            const base64Image = await convertToBase64(blob)

            dispatch(addImageElement(base64Image,
                {
                    width: image.width,
                    height: image.height
                }))
        } catch (error) {
            console.log('Error add unsplash image to slide: ', error)
        }
    }
}

const changeBackgroundFromUnsplash = () => {
    return async (dispatch: TDispatch, getState: () => RootState) => {
        try {
            const state = getState()
            const selectedImageId = state.present.externalImages?.imageSelectedId
            const image = state.present.externalImages?.images?.find(img => img.id == selectedImageId)
            if (!image || !image.src) {
                throw new Error('Error: no image selected')
            }
            const blob = await fetchImage(image.src)
            const base64Image = await convertToBase64(blob)

            const newBackgroundImage: ImageBackground = {
                type: 'image',
                src: base64Image,
            }

            dispatch(setBackgroundImage(newBackgroundImage))
        } catch (error) {
            console.log('Error add unsplash image to slide: ', error)
        }
    }
}


export {
    requestImages,
    setUnsplashPage,
    addUnsplashImageToSlide,
    changeBackgroundFromUnsplash
}