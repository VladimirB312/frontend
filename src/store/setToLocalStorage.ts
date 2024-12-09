import {PresentationType} from "./types.ts";

export function setToLocalStorage (newPresentation: PresentationType) {
    localStorage.setItem('presentationData', JSON.stringify(newPresentation))
}