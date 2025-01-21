import {PresentationType} from "./types.ts"

const setToLocalStorage = (newPresentation: PresentationType) => {
    localStorage.setItem('presentationData', JSON.stringify(newPresentation))
}

export {setToLocalStorage}