import {ARIAL, HELVETICA, TAHOMA, TIMES_NEW_ROMAN, VERDANA} from "../constants/fonts.ts";

const getFont = (font: string) => {
    switch (font) {
        case ARIAL:
            return 'arial'
        case TAHOMA:
            return 'tahoma'
        case VERDANA:
            return 'Verdana'
        case HELVETICA:
            return 'helvetica'
        case TIMES_NEW_ROMAN:
            return 'times'
        default:
            return 'helvetica'
    }
}

export {getFont}