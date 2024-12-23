import {PresentationType} from "./types.ts";

function setToLocalStorage (newPresentation: PresentationType) {
    localStorage.setItem('presentationData', JSON.stringify(newPresentation))
}

export {setToLocalStorage}